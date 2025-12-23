import Song from "../models/Song.js";

export const createSong = async (req, res) => {
  const song = await Song.create(req.body);
  res.status(201).json(song);
};

export const getSongs = async (req, res) => {
  const { genre } = req.query;
  const filter = genre ? { genre } : {};
  const songs = await Song.find(filter).sort({ createdAt: -1 });
  res.json(songs);
};

export const updateSong = async (req, res) => {
  const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.json(song);
};

export const deleteSong = async (req, res) => {
  await Song.findByIdAndDelete(req.params.id);
  res.status(204).end();
};
