/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { Song, Statistics } from "../types";
import SongForm from "../components/SongForm";
import SongItem from "../components/SongItem";
import StatisticsComponent from "../components/Statistics";
import {
  fetchSongs,
  createSong,
  updateSong,
  deleteSong,
  fetchStats,
} from "../services/api";

/* Container */
const container = css`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: #f8f8f8ff;
`;

/* Header */
const header = css`
  text-align: center;
  color: #4a90e2;
  font-size: 2.4rem;
  font-weight: bold;
  margin-bottom: 30px;
`;

/* Filter wrapper */
const filterWrapper = css`
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
`;

/* Select style */
const selectStyle = css`
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

/* Song list grid */
const songListWrapper = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;

  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

/* Stats wrapper */
const statsWrapper = css`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

/* Form wrapper for responsive width */
const formWrapper = css`
  margin-bottom: 20px;

  @media screen and (max-width: 500px) {
    form {
      width: 100%;
    }
  }
`;

const Home: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [stats, setStats] = useState<Statistics | null>(null);
  const [editing, setEditing] = useState<Song | null>(null);
  const [filterGenre, setFilterGenre] = useState<string>("All");

  const loadSongs = async (): Promise<void> => {
    try {
      const res = await fetchSongs();
      setSongs(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadStats = async (): Promise<void> => {
    try {
      const res = await fetchStats();
      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async (song: Song): Promise<void> => {
    try {
      if (editing && editing._id) {
        await updateSong(editing._id, song);
        setEditing(null);
      } else {
        await createSong(song);
      }
      await loadSongs();
      await loadStats();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id?: string): Promise<void> => {
    if (!id) return;
    try {
      await deleteSong(id);
      await loadSongs();
      await loadStats();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (song: Song): void => {
    setEditing(song);
  };

  useEffect(() => {
    loadSongs();
    loadStats();
  }, []);

  const filteredSongs =
    filterGenre === "All"
      ? songs
      : songs.filter((s) => s.genre === filterGenre);

  return (
    <div css={container}>
      <h1 css={header}>Addis Songs Dashboard</h1>

      <div css={formWrapper}>
        <SongForm onSubmit={handleAdd} initialData={editing || undefined} />
      </div>

      <div css={filterWrapper}>
        <label htmlFor="genreFilter">Filter by Genre:</label>
        <select
          id="genreFilter"
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}
          css={selectStyle}
        >
          <option value="All">All</option>
          {Array.from(new Set(songs.map((s) => s.genre))).map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div css={songListWrapper}>
        {filteredSongs.map((song, index) => (
          <SongItem
            key={song._id ?? index}
            song={song}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <div css={statsWrapper}>
        <StatisticsComponent stats={stats} />
      </div>
    </div>
  );
};

export default Home;
