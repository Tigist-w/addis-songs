import { takeEvery, call, put } from "redux-saga/effects";
import { fetchStats } from "../../services/api";
import {
  fetchStatsRequest,
  fetchStatsSuccess,
  fetchStatsFailure,
} from "../slices/statsSlice";
import { Statistics } from "../../types";

function* fetchStatsWorker(): Generator<any, void, any> {
  try {
    const response = yield call(fetchStats);
    yield put(fetchStatsSuccess(response.data as Statistics));
  } catch (error: any) {
    yield put(fetchStatsFailure(error.message));
  }
}

export default function* statsSaga(): Generator<any, void, any> {
  yield takeEvery(fetchStatsRequest.type, fetchStatsWorker);
}
