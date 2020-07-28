import React, { useState } from "react";
import { trigger } from "polyrhythm";

export const MessageComposer = () => {
  const [pendingMessage, setPendingMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    trigger("message/create", { text: pendingMessage });
    setPendingMessage("");
  };

  const handleChange = ({ target }) => {
    // Update React
    setPendingMessage(target.value);
    // Announce our edit
    trigger("message/edit/me");
  };

  return (
    <form className="chat-input-area" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Write something..."
        value={pendingMessage}
        onChange={handleChange}
        className="chat-input-area__input"
      />
      <button type="submit" className="chat-input-area__submit-button"></button>
    </form>
  );
};
