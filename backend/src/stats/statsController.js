import Song from "../models/Song.js";

export const getStatistics = async (req, res) => {
  try {
    const totalSongs = await Song.countDocuments();

    const songsPerGenre = await Song.aggregate([
      { $group: { _id: "$genre", count: { $sum: 1 } } },
    ]);

    const songsPerArtist = await Song.aggregate([
      {
        $group: {
          _id: "$artist",
          songCount: { $sum: 1 },
          albums: { $addToSet: "$album" },
        },
      },
    ]);

    const songsPerAlbum = await Song.aggregate([
      { $group: { _id: "$album", count: { $sum: 1 } } },
    ]);

    const totalArtists = songsPerArtist.length;
    const totalAlbums = songsPerAlbum.length;
    const totalGenres = songsPerGenre.length;

    res.json({
      totalSongs,
      totalArtists,
      totalAlbums,
      totalGenres,
      songsPerGenre,
      songsPerArtist,
      songsPerAlbum,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
