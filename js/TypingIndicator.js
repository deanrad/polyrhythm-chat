import React, { useState } from "react";
import { concat, after, useListener } from "polyrhythm";

export const TypingIndicator = ({ timeout = 5000 }) => {
  const [isTyping, setTyping] = useState(false);

  const autoTimeoutTyper = () =>
    concat(
      after(0, () => setTyping(true)),
      after(timeout, () => setTyping(false))
    );

  useListener(/message\/edit\/(?!me)/, autoTimeoutTyper, { mode: "replace" });
  useListener(/message\/from/, () => setTyping(false));

  return (
    isTyping && (
      <div className="chat-message__typing">
        <img src="https://osxtips.net/wp-content/uploads/imessage-sending-animated-gif.gif" />
      </div>
    )
  );
};
