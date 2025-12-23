import { takeEvery, call, put } from "redux-saga/effects";
import { fetchSongs } from "../../services/api";
import {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
} from "../slices/songSlice";
import { Song } from "../../types";

// Explicit return type for the generator
function* fetchSongsWorker(): Generator<any, void, any> {
  try {
    const response = yield call(fetchSongs);
    yield put(fetchSongsSuccess(response.data as Song[]));
  } catch (error: any) {
    yield put(fetchSongsFailure(error.message));
  }
}

export default function* songSaga(): Generator<any, void, any> {
  yield takeEvery(fetchSongsRequest.type, fetchSongsWorker);
}
