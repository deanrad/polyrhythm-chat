import React, { useState } from "react";
import { concat, after, useListener } from "polyrhythm";

export const TypingIndicator = ({ isTyping, timeout = 5000 }) => {
  return (
    isTyping && (
      <div className="chat-message__typing">
        <img src="https://osxtips.net/wp-content/uploads/imessage-sending-animated-gif.gif" />
      </div>
    )
  );
};
