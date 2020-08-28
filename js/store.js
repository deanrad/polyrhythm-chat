import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { typingSaga } from "./sagas";

const sagaMiddleware = createSagaMiddleware();

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
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(typingSaga);
