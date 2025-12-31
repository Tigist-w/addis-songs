import { takeEvery, call, put } from "redux-saga/effects";
import {
  fetchSongs,
  createSong,
  updateSong,
  deleteSong,
} from "../../services/api";
import {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongRequest,
  updateSongRequest,
  deleteSongRequest,
} from "../slices/songSlice";
import { Song } from "../../types";

// Worker saga to fetch all songs
function* fetchSongsWorker(): Generator<any, void, any> {
  try {
    const response = yield call(fetchSongs);
    yield put(fetchSongsSuccess(response.data as Song[]));
  } catch (error: any) {
    yield put(fetchSongsFailure(error.message));
  }
}

// Worker saga to create a new song
function* createSongWorker(
  action: ReturnType<typeof createSongRequest>
): Generator<any, void, any> {
  try {
    yield call(createSong, action.payload as Song);
    yield put(fetchSongsRequest()); // refresh list after creation
  } catch (error: any) {
    yield put(fetchSongsFailure(error.message));
  }
}

// Worker saga to update an existing song
function* updateSongWorker(
  action: ReturnType<typeof updateSongRequest>
): Generator<any, void, any> {
  try {
    const { id, song } = action.payload as { id: string; song: Song };
    yield call(updateSong, id, song);
    yield put(fetchSongsRequest()); // refresh list after update
  } catch (error: any) {
    yield put(fetchSongsFailure(error.message));
  }
}

// Worker saga to delete a song
function* deleteSongWorker(
  action: ReturnType<typeof deleteSongRequest>
): Generator<any, void, any> {
  try {
    yield call(deleteSong, action.payload as string);
    yield put(fetchSongsRequest()); // refresh list after deletion
  } catch (error: any) {
    yield put(fetchSongsFailure(error.message));
  }
}

// Root saga
export default function* songSaga(): Generator<any, void, any> {
  yield takeEvery(fetchSongsRequest.type, fetchSongsWorker);
  yield takeEvery(createSongRequest.type, createSongWorker);
  yield takeEvery(updateSongRequest.type, updateSongWorker);
  yield takeEvery(deleteSongRequest.type, deleteSongWorker);
}
