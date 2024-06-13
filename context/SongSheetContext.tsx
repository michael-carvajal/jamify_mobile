import React, { createContext, useContext, useState, useEffect, ReactNode, FC } from 'react';
import axios from 'axios';
import { Platform } from 'react-native';

interface SongSheet {
  id: number;
  title: string;
  // Add other fields as necessary
}

interface SongSheetContextState {
  songSheets: SongSheet[];
  loading: boolean;
  error: Error | null;
  fetchSongSheets: () => void;
  postSongSheet: (data: Partial<SongSheet>) => Promise<void>;
}

const SongSheetContext = createContext<SongSheetContextState | undefined>(undefined);

export const SongSheetProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [songSheets, setSongSheets] = useState<SongSheet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const apiUrl = process.env.EXPO_PUBLIC_JAMIFY_API_URL;

  const fetchSongSheets = async () => {
    setLoading(true);
    try {
      const response = await axios.get<SongSheet[]>(`${apiUrl}/songsheets`);
      setSongSheets(Object.values(response.data.Songsheets));
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const postSongSheet = async (data: Partial<SongSheet>) => {
    setLoading(true);
    try {
      const response = await axios.post<SongSheet>(`${apiUrl}/songsheets`, data);
      setSongSheets([...songSheets, response.data]);
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
    <SongSheetContext.Provider value={{ songSheets, loading, error, fetchSongSheets, postSongSheet }}>
      {children}
    </SongSheetContext.Provider>
  );
};

export const useSongSheets = (): SongSheetContextState => {
  const context = useContext(SongSheetContext);
  if (context === undefined) {
    throw new Error('useSongSheets must be used within a SongSheetProvider');
  }
  return context;
};
