import React, { useState } from "react";
import { after, useListener } from "polyrhythm";

export const TypingIndicator = ({ timeout = 5000 }) => {
  const [isTyping, setTyping] = useState(false);

  const autoTimeoutTyper = () => {
    trigger("typing/on");
    return after(timeout, () => trigger("typing/off"));
  };

  useListener(/message\/edit\/(?!me)/, autoTimeoutTyper, { mode: "replace" });
  useListener(/typing\/(on|off)/, ({ type }) => {
    setTyping(type === "typing/on");
  });
  useListener(/message\/from/, () => trigger("typing/off"));

  return (
    isTyping && (
      <div className="chat-message__typing">
        <img src="https://osxtips.net/wp-content/uploads/imessage-sending-animated-gif.gif" />
      </div>
    )
  );
};
