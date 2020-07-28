import React, { useState } from "react";

export const MessageComposer = () => {
  const [pendingMessage, setPendingMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setPendingMessage("");
  };

  const handleChange = ({ target }) => {
    // Update React
    setPendingMessage(target.value);
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
