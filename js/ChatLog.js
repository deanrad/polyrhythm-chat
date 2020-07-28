import pathToAvatarA from "../images/avatar-a.png";
import pathToAvatarB from "../images/avatar-b.png";

import React, { useState } from "react";
import { useListener } from "polyrhythm";

export const ChatLog = () => {
  const [messages, setMessages] = useState([
  ]);

  useListener(/message\/(from|create)/, (event) => {
    const message = event.payload;
    setMessages((all) => [...all, message]);
  });

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
