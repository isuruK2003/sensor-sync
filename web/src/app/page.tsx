"use client"

import { EthernetPort, Globe } from "lucide-react";
import { useState } from "react";
import { showAlert } from "../components/alert";
import { v4 as uuid } from 'uuid'
import { SensorData } from "./sensor-data";
import { D3LinePlot } from "@/components/chart";

enum ConnectionStatus {
  CLOSED, CONNECTING, CONNECTED,
  OPEN, DISCONNECTING, DISCONNECTED
}

export default function Home() {

  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(ConnectionStatus.CLOSED);
  const [domain, setDomain] = useState<string>("");
  const [port, setPort] = useState<string>("");
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [maxLength, setMaxLength] = useState<number>(50);

  const handleConnect = () => {

    if (websocket === null || websocket?.readyState === WebSocket.CLOSED) {
      try {
        setConnectionStatus(ConnectionStatus.CONNECTING);
        const url: string = `ws://${domain}:${port}/ws/${uuid()}`;

        const ws = new WebSocket(url);

        ws.onopen = () => {
          showAlert('Connection Established', `Successfully connected to the server at ${domain}.`);
          setConnectionStatus(ConnectionStatus.OPEN);
        }

        ws.onmessage = (event) => {
          try {
            const newData: SensorData = JSON.parse(event.data);
            setSensorData(prevData => {
              const updatedData = [...prevData, newData];
              return updatedData.slice(-maxLength);
            });
          } catch (error) {
            console.error('Error parsing WebSocket data:', error);
            showAlert('Error Updating the Chart', 'An error occurred when updating the chart.');
          }
        };

        ws.onerror = () => {
          showAlert('Connection Failed', `Unable to establish a connection to the server. Please check the server address or try again later.`);
        }

        ws.onclose = () => {
          showAlert('Connection Terminated', `The WebSocket connection to ${domain} has been closed.`);
          setConnectionStatus(ConnectionStatus.CLOSED);
        }

        setWebsocket(ws);
        setConnectionStatus(ConnectionStatus.OPEN);

      } catch (error) {
        showAlert("Unexpected Error", "An unexpected error occurred. Please try again later.");
        setConnectionStatus(ConnectionStatus.CLOSED);
      }
    }
  };

  const handleDisconnect = () => {
    if (websocket?.readyState == WebSocket.OPEN) {
      websocket.close();
    }
  }

  return (
    <div className="flex flex-row h-screen">

      {/* Sidebar */}
      <div className="w-[350px] bg-[#111] border-r p-[16px] border-[#222] text-[#ddd] font-mono">
        <div className="flex flex-col gap-[16px]">
          <div className="grid grid-cols-[28px_auto] items-center gap-[16px]">
            <Globe size={18} className="text-[#aaa]" />
            <input
              value={domain}
              className="w-full text-sm border border-[#333] py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500/75 rounded-xl bg-[#111]"
              type="text"
              placeholder="IP Address / Domain"
              onChange={(event) => setDomain(event.target.value)}
            />
          </div>
          <div className="grid grid-cols-[28px_auto] items-center gap-[16px]">
            <EthernetPort size={18} className="text-[#aaa]" />
            <input
              value={port}
              className="w-full text-sm border border-[#333] py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500/75 rounded-xl bg-[#111]"
              type="text"
              placeholder="Port"
              onChange={(event) => setPort(event.target.value)}
            />
          </div>
          {
            connectionStatus === ConnectionStatus.OPEN ?
              <button
                className="bg-orange-800 ring-orange-500 hover:bg-orange-700 py-[8px] cursor-pointer px-[4px] rounded-xl"
                onClick={handleDisconnect}
              >
                Disconnect
              </button>
              :
              <button
                className="bg-orange-800 ring-orange-500 hover:bg-orange-700 py-[8px] cursor-pointer px-[4px] rounded-xl"
                onClick={handleConnect}
                disabled={connectionStatus === ConnectionStatus.CONNECTING}
              >
                {connectionStatus === ConnectionStatus.CONNECTING ? "Connecting..." : "Connect"}
              </button>
          }
        </div>
      </div>

      <hr className="text-[#222]" />

      {/* Content */}
      <div className="w-full p-4 overflow-y-scroll space-y-[16px]">
        <D3LinePlot sensorData={sensorData} className="w-full h-[600px]" />
      </div>
    </div>
  );
}