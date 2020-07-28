import pathToAvatarA from "../images/avatar-a.png";
import pathToAvatarB from "../images/avatar-b.png";

import React, { useState } from "react";

export const ChatLog = () => {
  const [messages, setMessages] = useState([
    { text: "Hi YOU!" },
    { text: "I'm here to talk - whaddya wanna know?" },
    { text: "What is the answer to the eternal question?", userId: "me" },
    { text: "It is ..." },
  ]);

  return (
    <div className="chat-log">
      {messages.map((message, i) => {
        return <ChatMessage key={i} {...message} />;
      })}
    </div>
  );
};

export const ChatMessage = ({ text, userId, myUserId = "me" }) => {
  const isMine = userId === myUserId;
  const imgSrc = isMine ? pathToAvatarB : pathToAvatarA;

  return (
    <div className={`chat-message ${isMine ? "chat-message--right" : ""}`}>
      <span className="chat-message__avatar-frame">
        <img src={imgSrc} alt="avatar" className="chat-message__avatar" />
      </span>
      <p className="chat-message__text">{text} </p>
    </div>
  );
};
