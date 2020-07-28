import "../sass/index.scss";

import React from "react";
import ReactDOM from "react-dom";
import { TypingIndicator } from "./TypingIndicator";
import { MessageComposer } from "./MessageComposer";
import { WebsocketService } from "./WebsocketService";
import { ChatLog } from "./ChatLog";
import { filter, trigger, after, concat } from "polyrhythm";

// log all messages on the channel/event bus
filter(true, ({ type, payload }) => console.log(type, payload));
Object.assign(window, { trigger, after });

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

runStartupScript();
/*
  // Can also use trigger and after to run ad-hoc scripts in the console via:
  trigger('message/edit/bot');
  await after(1000, () => trigger('message/from/bot', { text: 'Done.' }));
  await after(2000, () => trigger('message/edit/bot'))
*/

//prettier-ignore
function runStartupScript() {
  concat(
    after(100, ["message/from/bot", "Hi YOU!"]),
    after(100, ["message/from/bot", "I'm here to talk - whaddya wanna know?"]),
    after(1500, ["message/edit/me"]),
    after(1500, ["message/create", "What is the answer to the eternal question?", "me"]),
    after(1500, ["message/edit/bot"]),
    after(1500, ["message/from/bot", "It is ..."]),
    after(500, ["message/edit/bot"])
  ).subscribe(([type, text, userId]) => trigger(type, { text, userId }));
}
