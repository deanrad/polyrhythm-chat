import { useEffect } from "react";
import io from "socket.io-client";

export const WebsocketService = ({ myID, url = "" }) => {
  useEffect(() => {
    const socket = io(url);

    return () => {
      socket.close();
    };
  }, []);

  return null;
};
