// UserContext.tsx
import React, { createContext, useContext, useState, ReactNode, FC, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
    id: number;
    username: string;
    email: string;
    // Add other user properties as needed
}

interface UserContextProps {
    user: User | null;
    allUsers: User[] | null;
    login: (email: string, password: string) => Promise<void>;
    signUp: (username: string, firstName: string, lastName: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    error: string | null;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [allUsers, setAllUsers] = useState<User[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getStoredUser = async () => {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                setUser(JSON.parse(user));
            }
        };
        getAllUsers()
        getStoredUser();
    }, []);
    const getAllUsers = async () => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_JAMIFY_API_URL}/users`);
            const data = await response.json();
            console.log('all users data =========-->',data);
            setAllUsers(data.users)
            
        } catch (error) {
            console.log(error);
            
        }

    }
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
                await AsyncStorage.setItem('user', JSON.stringify({ ...data }));

                const token = await response.headers.map['set-cookie'].split(';')[0].split('=')[1];
                const session = await response.headers.map['set-cookie'].split(', ')[1].split(';')[0].split('=')[1];
                console.log('token from login post ======>', session);

                await AsyncStorage.setItem('csrf_token', token); // Store token in AsyncStorage
                await AsyncStorage.setItem('session', session); // Store token in AsyncStorage
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error('Login error', error);
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    const signUp = async (username: string, firstName: string, lastName: string, email: string, password: string) => {
        try {
            const csrf = await AsyncStorage.getItem('csrf_token');
            const response = await fetch(`${process.env.EXPO_PUBLIC_JAMIFY_API_URL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'csrf_token': csrf! },
                body: JSON.stringify({ username, first_name: firstName, last_name: lastName, email, password }),
            });

            const data = await response.json();
            if (data.errors) {
                setError(data.errors.join(', '));
            } else {
                setUser({ ...data });
                await AsyncStorage.setItem('user', JSON.stringify({ ...data }));

                const token = await response.headers.map['set-cookie'].split(';')[0].split('=')[1];
                const session = await response.headers.map['set-cookie'].split(', ')[1].split(';')[0].split('=')[1];
                console.log('token from login post ======>', session);

                await AsyncStorage.setItem('csrf_token', token); // Store token in AsyncStorage
                await AsyncStorage.setItem('session', session); // Store token in AsyncStorage
                setError(null);
            }
        } catch (error) {
            console.error('Sign-up error', error);
            setError('An error occurred during sign-up. Please try again.');
        }
    };

    const logout = () => {
        setUser(null);
        AsyncStorage.removeItem('authToken'); // Remove token from AsyncStorage
    };

    return (
        <UserContext.Provider value={{ user, login, signUp, logout, error, allUsers }}>
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
