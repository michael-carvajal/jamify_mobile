// types.ts

// Define the Album type
export type Album = {
    artist_id: number;
    created_at: string;
    id: number;
    name: string;
    updated_at: string;
    year_released: number;
  };
  
  // Define the Artist type
  export type Artist = {
    created_at: string;
    id: number;
    name: string;
    updated_at: string;
  };
  
  // Define the Genre type
  export type Genre = {
    created_at: string;
    id: number;
    name: string;
  };
  
  // Define the Songsheet type
  export type Songsheet = {
    album_id: number;
    artist_id: number;
    author_id: number;
    body: string;
    created_at: string;
    genre_id: number;
    id: number;
    key: string;
    song_name: string;
    title: string;
    updated_at: string;
    version: number;
  };
  
  // Define the main response type
  export type SongsheetResponse = {
    Albums: { [key: string]: Album };
    Artists: { [key: string]: Artist };
    Genres: { [key: string]: Genre };
    Songsheets: { [key: string]: Songsheet };
  };
  