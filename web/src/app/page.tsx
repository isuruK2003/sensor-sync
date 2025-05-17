"use client"

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { LineChart } from "./chart";
import { SensorData } from "./sensor-data";

export default function Home() {
  const [domain, setDomain] = useState<string>('192.168.8.170');
  const [port, setPort] = useState<string>('8000');
  const [websocket, setWebsocket] = useState<WebSocket>();
  const [data, setData] = useState<SensorData[]>([]);
  const [maxLength, setMaxLength] = useState<number>(100);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const handleConnect = () => {
    try {
      const url: string = `ws://${domain}:${port}/ws/gyro/${uuidv4()}`;
      const ws = new WebSocket(url);

      ws.onopen = () => {
        alert('Connection Success');
        setIsConnected(true);
      };

      ws.onmessage = (event) => {
        try {
          const newData: SensorData = JSON.parse(event.data);
          setData(prevData => {
            // Keep only the last 100 data points for performance
            const updatedData = [...prevData, newData];
            return updatedData.slice(-maxLength);
          });
        } catch (error) {
          console.error('Error parsing WebSocket data:', error);
        }
      };

      ws.onerror = (e) => {
        alert('Error Occurred');
        setIsConnected(false);
      };

      ws.onclose = (e) => {
        alert('Connection Closed');
        setIsConnected(false);
      };

      setWebsocket(ws);
    } catch (error) {
      alert("Error Occurred");
      setIsConnected(false);
    }
  };

  const handleDisconnect = () => {
    if (websocket?.readyState === WebSocket.OPEN) {
      websocket.close();
      setIsConnected(false);
    }
  }

  // Clean up WebSocket connection on component unmount
  useEffect(() => {
    return () => {
      if (websocket?.readyState === WebSocket.OPEN) {
        websocket.close();
      }
    };
  }, [websocket]);

  return (
    <div className="p-8">
      <div className="flex flex-col space-y-4 mb-8">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Domain</label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Port</label>
            <input
              type="text"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            />
          </div>
        </div>
        <div className="flex space-x-4">
          {!isConnected ? (
            <button
              onClick={handleConnect}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Connect
            </button>
          ) : (
            <button
              onClick={handleDisconnect}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Disconnect
            </button>
          )}
        </div>
      </div>

      <div className="p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Sensor Data Visualization</h2>
        {data.length > 0 ? (
          <div>
            <LineChart sensorData={data} height={600} width={800} />
          </div>
        ) : (
          <div className="h-96 flex items-center justify-center bg-gray-100 rounded-md">
            <p className="text-gray-500">
              {isConnected ? "Waiting for data..." : "Not connected to WebSocket"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}