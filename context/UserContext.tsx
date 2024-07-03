// UserContext.tsx

import React, { createContext, useContext, useState, ReactNode, FC } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
    id: number;
    username: string;
    email: string;
    // Add other user properties as needed
}

interface UserContextProps {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async (email: string, password: string) => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_JAMIFY_API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setUser({ ...data });

                const token = await response.headers.map["set-cookie"].split(";")[0].split("=")[1];
                const session = await response.headers.map["set-cookie"].split(", ")[1].split(";")[0].split("=")[1]
                console.log("token from login post             ======>", session);

                await AsyncStorage.setItem('csrf_token', token); // Store token in AsyncStorage
                await AsyncStorage.setItem('session', session); // Store token in AsyncStorage

            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error('Login error', error);
        }
    };

    const logout = () => {
        setUser(null);
        AsyncStorage.removeItem('authToken'); // Remove token from AsyncStorage
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextProps => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
