/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Song } from "../types";
import { useState, useEffect } from "react";

interface Props {
  onSubmit: (song: Song) => void;
  initialData?: Song;
}

const formStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 15px;
  border-radius: 10px;
  background: white;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.05);
`;

const inputStyle = css`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

const buttonStyle = css`
  padding: 10px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background-color: #4a90e2;
  color: white;
  font-weight: bold;
  transition: all 0.2s;
  &:hover {
    background-color: #357abd;
  }
`;

const SongForm = ({ onSubmit, initialData }: Props) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [artist, setArtist] = useState(initialData?.artist || "");
  const [album, setAlbum] = useState(initialData?.album || "");
  const [genre, setGenre] = useState(initialData?.genre || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, artist, album, genre });
    setTitle("");
    setArtist("");
    setAlbum("");
    setGenre("");
  };

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setArtist(initialData.artist);
      setAlbum(initialData.album);
      setGenre(initialData.genre);
    }
  }, [initialData]);

  return (
    <form css={formStyle} onSubmit={handleSubmit}>
      <input
        css={inputStyle}
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        css={inputStyle}
        type="text"
        placeholder="Artist"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        required
      />
      <input
        css={inputStyle}
        type="text"
        placeholder="Album"
        value={album}
        onChange={(e) => setAlbum(e.target.value)}
        required
      />
      <input
        css={inputStyle}
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        required
      />
      <button css={buttonStyle} type="submit">
        {initialData ? "Update Song" : "Add Song"}
      </button>
    </form>
  );
};

export default SongForm;
