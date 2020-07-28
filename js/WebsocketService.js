import io from "socket.io-client";
import { useEffectAtMount, trigger, listen } from "polyrhythm";

export const WebsocketService = ({ myID, url = "" }) => {
  useEffectAtMount(() => {
    const socket = io(url);

    socket.on("event", ({ type, payload }) => {
      if (type.startsWith("message/from/")) {
        trigger(type, payload); // <<------ Announce "you've got a chat"!
      }
    });

    const forwarder = listen("message/create", ({ payload }) => {
      socket.emit("event", { type: `message/from/${myID}`, payload });
    });

    return () => {
      forwarder.unsubscribe();
      socket.close();
    };
  });

  return null;
};
