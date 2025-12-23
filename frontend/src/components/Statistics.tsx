/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Statistics } from "../types";

interface Props {
  stats: Statistics | null;
}

const statsCard = css`
  background: #4a90e2;
  color: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  font-weight: bold;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
`;

const chartBar = css`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
`;

const barContainer = css`
  flex: 1;
  background: #e0e0e0;
  border-radius: 8px;
  height: 20px;
  overflow: hidden;
`;

const barFill = (width: number) => css`
  height: 100%;
  width: ${width}%;
  background: #4a90e2;
  border-radius: 8px;
  transition: width 0.5s;
`;

const StatisticsComponent = ({ stats }: Props) => {
  if (!stats) return <p>Loading statistics...</p>;

  const maxGenreCount =
    stats.songsPerGenre.length > 0
      ? Math.max(...stats.songsPerGenre.map((g) => g.count))
      : 1;

  return (
    <div>
      <div css={statsCard}>Total Songs: {stats.totalSongs}</div>
      <div css={statsCard}>Total Artists: {stats.totalArtists}</div>
      <div css={statsCard}>Total Albums: {stats.totalAlbums}</div>
      <div css={statsCard}>Total Genres: {stats.totalGenres}</div>

      <h4>Songs per Genre</h4>
      {stats.songsPerGenre.map((g) => (
        <div key={g._id} css={chartBar}>
          <span>{g._id}</span>
          <div css={barContainer}>
            <div css={barFill((g.count / maxGenreCount) * 100)}></div>
          </div>
          <span>{g.count}</span>
        </div>
      ))}
    </div>
  );
};

export default StatisticsComponent;
