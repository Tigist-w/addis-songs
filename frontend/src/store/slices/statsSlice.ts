import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Statistics } from "../../types";

interface StatsState {
  stats: Statistics | null;
  loading: boolean;
  error: string | null;
}

const initialState: StatsState = {
  stats: null,
  loading: false,
  error: null,
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    fetchStatsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchStatsSuccess(state, action: PayloadAction<Statistics>) {
      state.stats = action.payload;
      state.loading = false;
    },
    fetchStatsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStatsRequest, fetchStatsSuccess, fetchStatsFailure } =
  statsSlice.actions;
export default statsSlice.reducer;
