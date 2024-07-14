import React, { createContext, useContext, useState, useEffect, ReactNode, FC } from 'react';
import axios from 'axios';
import { Setlist, SetlistItems } from '../types/Setlist';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SetlistContextState {
    setlists: Setlist[];
    loading: boolean;
    error: Error | null;
    fetchSetlists: () => void;
    postSetlist: (data: Partial<Setlist>) => Promise<void>;
}

const SetlistContext = createContext<SetlistContextState | undefined>(undefined);

export const SetlistProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [setlists, setSetlists] = useState<Setlist[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const env = process.env.EXPO_PUBLIC_ENV;
    const apiUrl = env === "production" || Platform.OS === "ios" ? process.env.EXPO_PUBLIC_JAMIFY_API_URL : process.env.EXPO_PUBLIC_LOCAL_JAMIFY_API_URL;

    const fetchSetlists = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/setlists`,
                { 'credentials': 'include' }
            );
            const data = await response.json();
            if (Platform.OS !== 'web') {
                const token = await response.headers.map["set-cookie"].split(";")[0].split("=")[1];
                console.log("cookieeees", typeof token);
                await AsyncStorage.setItem('csrf_token', token);


            }
            setSetlists(Object.values(data.Setlist_items));

        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    const postSetlist = async (data: Partial<Setlist>) => {
        setLoading(true);
        try {
            await axios.post(`${apiUrl}/setlists`, data);
            await fetchSetlists(); 
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSetlists();
    }, []);

    return (
        <SetlistContext.Provider value={{ setlists, loading, error, fetchSetlists, postSetlist }}>
            {children}
        </SetlistContext.Provider>
    );
};

export const useSetlists = (): SetlistContextState => {
    const context = useContext(SetlistContext);
    if (!context) {
        throw new Error('useSetlists must be used within a SetlistProvider');
    }
    return context;
};

