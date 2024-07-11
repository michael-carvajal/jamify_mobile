// SongSheetContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode, FC } from 'react';
import axios from 'axios';
import { SongsheetResponse, Songsheet, Album, Artist, Genre } from '../types/SongSheets';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const apiUrl = env === "production" || Platform.OS === "ios" ? process.env.EXPO_PUBLIC_JAMIFY_API_URL : process.env.EXPO_PUBLIC_LOCAL_JAMIFY_API_URL;

  const fetchSongSheets = async () => {
    setLoading(true);
    try {
      console.log('fetching songs');

      const response = await fetch(`${apiUrl}/songsheets`,
        { 'credentials': 'include' }
      );
      console.log('response from songsheets');

      const data = await response.json();
      console.log('response again +++===> ', response.headers);
      if (Platform.OS !== 'web') {
        const token = await response.headers.map["set-cookie"].split(";")[0].split("=")[1];
        console.log("cookieeees", typeof token);
        await AsyncStorage.setItem('csrf_token', token);


      }



      setSongSheets(Object.values(data.Songsheets));
      setAlbums(Object.values(data.Albums));
      setArtists(Object.values(data.Artists));
      setGenres(Object.values(data.Genres));

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

