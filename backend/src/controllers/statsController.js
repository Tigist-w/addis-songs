import Song from "../models/Song.js";

export const getStatistics = async (req, res) => {
  const totalSongs = await Song.countDocuments();

  const songsByGenre = await Song.aggregate([
    { $group: { _id: "$genre", count: { $sum: 1 } } },
  ]);

  const songsByArtist = await Song.aggregate([
    {
      $group: {
        _id: "$artist",
        songs: { $sum: 1 },
        albums: { $addToSet: "$album" },
      },
    },
    {
      $project: {
        songs: 1,
        albums: { $size: "$albums" },
      },
    },
  ]);

  res.json({
    totalSongs,
    songsByGenre,
    songsByArtist,
  });
};
