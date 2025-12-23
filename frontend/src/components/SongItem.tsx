/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Song } from "../types";

interface Props {
  song: Song;
  onEdit: (song: Song) => void;
  onDelete: (id?: string) => void;
}

const cardStyle = css`
  background: white;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: transform 0.2s, box-shadow 0.2s;
  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const buttonStyle = css`
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background-color: #4a90e2;
  color: white;
  margin-right: 5px;
  &:hover {
    background-color: #357abd;
  }
`;

const genreBadge = (genre: string) => css`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
  color: white;
  margin-top: 5px;
  background-color: ${{
    pop: "#ff6b81",
    rock: "#6b5b95",
    jazz: "#ffb347",
    classical: "#1e90ff",
    hiphop: "#ff7f50",
  }[genre.toLowerCase()] || "#888"};
`;

const SongItem = ({ song, onEdit, onDelete }: Props) => {
  return (
    <div css={cardStyle}>
      <div>
        <h3>{song.title}</h3>
        <p>Artist: {song.artist}</p>
        <p>Album: {song.album}</p>
        <span css={genreBadge(song.genre)}>{song.genre}</span>
      </div>
      <div>
        <button css={buttonStyle} onClick={() => onEdit(song)}>
          Edit
        </button>
        <button css={buttonStyle} onClick={() => onDelete(song._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default SongItem;
