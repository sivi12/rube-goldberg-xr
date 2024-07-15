import React, { useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const ConnectToArduino = () => {
  const { lastMessage, sendMessage } = useWebSocket("wss://192.168.1.136:8080");

  sendMessage("huansooohn");

  useEffect(() => {
    if (lastMessage !== null) {
      alert(`Message from server: ${lastMessage.data}`);
    }
  }, [lastMessage]);
};

export default ConnectToArduino;
