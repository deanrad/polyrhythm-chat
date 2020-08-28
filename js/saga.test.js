const { testSaga } = require("redux-saga-test-plan");
const { typingSaga, beginTyping } = require("./sagas");
const { takeLatest, put, call } = require("redux-saga/effects");

test("one", () => {
  //prettier-ignore
  testSaga(typingSaga, "dep1")
    .next()
    .fork(takeLatest, "message/edit/bot", beginTyping)
    .take("A BREAK");
});
