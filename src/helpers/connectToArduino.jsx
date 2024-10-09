import React, { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const ConnectToArduino = ({ setCurrentAnimation, startGame }) => {
  const { lastMessage, sendMessage } = useWebSocket(
    "https://192.168.1.136:8080"
  );

  sendMessage("huhuh");

  useEffect(() => {
    if (lastMessage !== null && startGame) {
      //alert(`Message from server: ${lastMessage.data}`);
      setCurrentAnimation("startAnimation");
    }
  }, [lastMessage]);
};

export default ConnectToArduino;
