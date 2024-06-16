// SongSheetContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode, FC } from 'react';
import axios from 'axios';
import { SongsheetResponse, Songsheet, Album, Artist, Genre } from '../types/SongSheets';

interface SongSheetContextState {
  songSheets: Songsheet[];
  albums: Album[];
  artists: Artist[];
  genres: Genre[];
  loading: boolean;
  error: Error | null;
  fetchSongSheets: () => void;
  postSongSheet: (data: Partial<Songsheet>) => Promise<void>;
}

const SongSheetContext = createContext<SongSheetContextState | undefined>(undefined);

export const SongSheetProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [songSheets, setSongSheets] = useState<Songsheet[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const env = process.env.EXPO_PUBLIC_ENV;  
  const apiUrl = env === "production" ? process.env.EXPO_PUBLIC_JAMIFY_API_URL : process.env.EXPO_PUBLIC_LOCAL_JAMIFY_API_URL ;

  const fetchSongSheets = async () => {
    setLoading(true);
    try {
      const response = await axios.get<SongsheetResponse>(`${apiUrl}/songsheets`);
      setSongSheets(Object.values(response.data.Songsheets));
      setAlbums(Object.values(response.data.Albums));
      setArtists(Object.values(response.data.Artists));
      setGenres(Object.values(response.data.Genres));
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const postSongSheet = async (data: Partial<Songsheet>) => {
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/songsheets`, data);
      await fetchSongSheets(); // Refresh the data after posting a new song sheet
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongSheets();
  }, []);

  return (
    <SongSheetContext.Provider value={{ songSheets, albums, artists, genres, loading, error, fetchSongSheets, postSongSheet }}>
      {children}
    </SongSheetContext.Provider>
  );
};

export const useSongSheets = (): SongSheetContextState => {
  const context = useContext(SongSheetContext);
  if (!context) {
    throw new Error('useSongSheets must be used within a SongSheetProvider');
  }
  return context;
};
