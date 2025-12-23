export interface Song {
  _id?: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

export interface Statistics {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  songsPerGenre: { _id: string; count: number }[];
  songsPerArtist: { _id: string; albums: string[]; songCount: number }[];
  songsPerAlbum: { _id: string; count: number }[];
}
