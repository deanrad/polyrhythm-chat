import io from "socket.io-client";
import { useEffectAtMount, trigger, listen, concat, after } from "polyrhythm";

export const WebsocketService = ({ myID = "me", url = "" }) => {
  useEffectAtMount(() => {
    const socket = io(url);

    socket.on("event", ({ type, payload }) => {
      if (
        type.startsWith("message/from/") ||
        type.startsWith("message/edit/")
      ) {
        trigger(type, payload); // <<------ Announce "you've got a chat"!
      }
    });

    const forwarder = listen("message/create", ({ payload }) => {
      socket.emit("event", { type: `message/from/${myID}`, payload });
    });

    const typingForwarder = listen(
      "message/edit/me",
      () =>
        //prettier-ignore
        concat(
          after(0, () => trigger(`message/edit/${myID}` /*//socket.emit("event", { type: `message/edit/${myID}` })*/ )),
          after(1000)
        ),
      { mode: "ignore" }
    );

    return () => {
      forwarder.unsubscribe();
      typingForwarder.unsubscribe();
      socket.close();
    };
  });

  return null;
};
