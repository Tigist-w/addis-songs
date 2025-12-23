import axios from "axios";
import { Song, Statistics } from "../types";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({ baseURL: API_BASE_URL });

export const fetchSongs = () => api.get<Song[]>("/songs");
export const createSong = (song: Song) => api.post<Song>("/songs", song);
export const updateSong = (id: string, song: Song) =>
  api.put<Song>(`/songs/${id}`, song);
export const deleteSong = (id: string) => api.delete(`/songs/${id}`);
export const fetchStats = () => api.get<Statistics>("/stats");
