import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "../../types";

interface SongState {
  songs: Song[];
  loading: boolean;
  error: string | null;
}

const initialState: SongState = {
  songs: [],
  loading: false,
  error: null,
};

const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongsRequest(state) {
      state.loading = true;
    },
    fetchSongsSuccess(state, action: PayloadAction<Song[]>) {
      state.songs = action.payload;
      state.loading = false;
    },
    fetchSongsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    createSongRequest(state, _action: PayloadAction<Song>) {
      state.loading = true;
    },
    updateSongRequest(
      state,
      _action: PayloadAction<{ id: string; song: Song }>
    ) {
      state.loading = true;
    },
    deleteSongRequest(state, _action: PayloadAction<string>) {
      state.loading = true;
    },
  },
});

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongRequest,
  updateSongRequest,
  deleteSongRequest,
} = songSlice.actions;
export default songSlice.reducer;
