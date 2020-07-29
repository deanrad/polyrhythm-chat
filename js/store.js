import { createStore, applyMiddleware } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { typingEpic } from "./epics";

const epicMiddleware = createEpicMiddleware();

export const initialState = {
  isTyping: false,
};

export const store = createStore(
  // prettier-disable
  (state = initialState, { type, payload }) => {
    console.log(`S: ${type} ${payload}`);

    switch (type) {
      case "message/edit/bot":
        return { isTyping: true };

      case "typing/off":
        return { isTyping: false };

      default:
        return state;
    }
  },
  applyMiddleware(epicMiddleware)
);

epicMiddleware.run(combineEpics(typingEpic));
