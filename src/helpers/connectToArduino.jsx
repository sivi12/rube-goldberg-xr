import React, { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const ConnectToArduino = ({
  arduinoButtonPressed,
  setArduinoButtonPressed,
}) => {
  const { lastMessage, sendMessage } = useWebSocket(
    "https://192.168.1.136:8087"
  );

  sendMessage("huhuh");

  useEffect(() => {
    if (lastMessage !== null) {
      //alert(`Message from server: ${lastMessage.data}`);
      setArduinoButtonPressed(true);
    }
  }, [lastMessage]);
};

export default ConnectToArduino;
