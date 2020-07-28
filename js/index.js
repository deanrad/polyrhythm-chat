import "../sass/index.scss";

import React from "react";
import ReactDOM from "react-dom";
import { TypingIndicator } from "./TypingIndicator";
import { MessageComposer } from "./MessageComposer";
import { WebsocketService } from "./WebsocketService";
import { ChatLog } from "./ChatLog";
import { filter, trigger, after } from "polyrhythm";

// log all messages on the channel/event bus
filter(true, ({ type, payload }) => console.log(type, payload));
Object.assign(window, { trigger });

const root = document.querySelector(".chat-container");
const app = (
  <>
    <ChatLog />
    <TypingIndicator />
    <MessageComposer />
    <WebsocketService />
  </>
);
ReactDOM.render(app, root);

after(1000).then(() => {
  [
    { text: "Hi YOU!" },
    { text: "I'm here to talk - whaddya wanna know?" },
    { text: "What is the answer to the eternal question?", userId: "me" },
    { text: "It is ..." },
  ].map((message) => trigger("message/create", message));
});
