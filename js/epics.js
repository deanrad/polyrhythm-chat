import { merge, concat, race } from "rxjs";
import { switchMap, mapTo } from "rxjs/operators";
import { ofType } from "redux-observable";
import { after } from "polyrhythm";

export const typingEpic = (action$) =>
  action$.pipe(
    ofType("message/edit/bot"),
    mapTo({ type: "typing/on" }),
    switchMap(() => {
      return race(
        after(5000, { type: "typing/off" }),
        action$.pipe(ofType("message/from/bot"), mapTo({ type: "typing/off" }))
      );
    })
  );

// More concise - does it do as much?
// export const typingEpic = (action$) =>
// merge(
//   action$.pipe(ofType("message/edit/bot"), switchMap(autoTyper)),
//   action$.pipe(ofType("message/from/bot"), mapTo({ type: "typing/off" }))
// );
