# Sensor Sync

Sensor Sync is a cross-platform application designed to monitor and visualize real-time sensor data from mobile devices. The project consists of a mobile app for collecting and streaming sensor data, a FastAPI server for handling WebSocket connections, and a web client for visualizing the data in real time.

## Features

- Collects accelerometer, gyroscope, and magnetometer data from mobile devices
- Streams sensor data to a backend server via WebSockets
- Real-time data visualization in the web client using D3.js
- Simple and modern UI for both mobile and web

## Technologies Used

### Mobile App
- **React Native** (with Expo)
- **TypeScript**

### Web Client
- **Next.js** (React 19)
- **TypeScript**
- **D3.js** for data visualization
- **Tailwind CSS** for styling

### Backend Server
- **FastAPI** (Python)