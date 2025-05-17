"use client"

import { EthernetPort, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { showAlert } from "./components/alert";
import { v4 as uuid } from 'uuid'

export default function Home() {

  const [websocket, setWebsocket] = useState<WebSocket>();
  const [domain, setDomain] = useState<string>("");
  const [port, setPort] = useState<string>("");

  const handelConnect = () => {

    if (websocket === undefined || websocket?.readyState === WebSocket.CLOSED) {
      try {
        const url: string = `ws://${domain}:${port}/ws/gyro/${uuid()}`;

        const ws = new WebSocket(url);

        ws.onopen = () => showAlert('Connection Established', `Successfully connected to the server at ${domain}.`);
        ws.onerror = () => showAlert('Connection Failed', `Unable to establish a connection to the server. Please check the server address or try again later.`);
        ws.onclose = () => showAlert('Connection Terminated', `The WebSocket connection to ${domain} has been closed.`);

        setWebsocket(ws);

      } catch (error) {
        showAlert("Unexpected Error", "An unexpected error occurred. Please try again later.");
      }
    }
  };

  useEffect(() => {

  }, []);

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
          <button
            className="bg-orange-800 ring-orange-500 hover:bg-orange-700 py-[8px] cursor-pointer px-[4px] rounded-xl"
            onClick={handelConnect}
          >
            Connect
          </button>
        </div>
      </div>

      <hr className="text-[#222]" />

      {/* Content */}
      <div className="flex-1 relative p-4">
      </div>
    </div>
  );
}