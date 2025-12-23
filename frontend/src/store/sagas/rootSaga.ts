import { all, fork } from "redux-saga/effects";
import songSaga from "./songSaga";
import statsSaga from "./statsSaga";

export default function* rootSaga() {
  yield all([fork(songSaga), fork(statsSaga)]);
}
