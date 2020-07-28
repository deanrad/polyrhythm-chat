import io from "socket.io-client";
import { useEffectAtMount, trigger } from "polyrhythm";

export const WebsocketService = ({ myID, url = "" }) => {
  useEffectAtMount(() => {
    const socket = io(url);

    socket.on("event", ({ type, payload }) => {
      if (type.startsWith("message/from/")) {
        trigger(type, payload); // <<------ Announce "you've got a chat"!
      }
    });

    return () => {
      socket.close();
    };
  });

  return null;
};
