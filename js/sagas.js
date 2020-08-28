const {
  takeLatest,
  put,
  take,
  call,
  race,
  fork,
  delay,
} = require("redux-saga/effects");

function* typingSaga() {
  yield takeLatest("message/edit/bot", autoTimeoutTyper);
  yield takeLatest("message/from/bot", function* () {
    yield put({ type: "typing/off" });
  });
}

function* autoTimeoutTyper() {
  yield put({ type: "typing/on" });
  yield delay(5000);
  yield put({ type: "typing/off" });
}

module.exports = {
  typingSaga,
};
