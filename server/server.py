from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from pydantic import BaseModel

app = FastAPI()

# Optional: Define a Pydantic model for data validation
class SensorData(BaseModel):
    t: int
    x: float
    y: float
    z: float

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_json(self, message: dict, websocket: WebSocket):
        await websocket.send_json(message)

    async def broadcast_json(self, message: dict):
        for connection in self.active_connections:
            await connection.send_json(message)

manager = ConnectionManager()

@app.websocket("/ws/gyro/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    await manager.connect(websocket)
    try:
        while True:
            # Receive JSON data
            data = await websocket.receive_json()
            # Validate data (optional step using Pydantic)
            sensor_data = SensorData(**data)

            # Send personal confirmation as JSON
            await manager.send_personal_json({
                "status": "received",
                "your_data": data
            }, websocket)

            # Broadcast JSON to all clients
            await manager.broadcast_json({
                "client_id": client_id,
                "t": sensor_data.t,
                "x": sensor_data.x,
                "y": sensor_data.y,
                "z": sensor_data.z
            })
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast_json({
            "type": "disconnect",
            "client_id": client_id
        })