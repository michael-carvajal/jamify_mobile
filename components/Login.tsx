import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, Platform } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';

const Login = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const env = process.env.EXPO_PUBLIC_ENV;

    const apiUrl = env === "production" || Platform.OS === "ios" ? process.env.EXPO_PUBLIC_JAMIFY_API_URL : process.env.EXPO_PUBLIC_LOCAL_JAMIFY_API_URL;

    const parsedUrl = apiUrl?.split("/api")[0]
    console.log(parsedUrl);
    useEffect(() => {
        handleLogin();
    }, [])
    const handleLogin = async () => {
        const csrf = await AsyncStorage.getItem("csrf_token")
        console.log(csrf);
        try {

            const csrfToken = csrf
            const response = await axios.post('http://127.0.0.1:5000/api/auth/login', {
                email: email,
                password: password,
            }, {
                headers: {
                    'X-CSRFToken': csrfToken
                },
                withCredentials: true, // Ensure credentials are sent with the request
            });
            if (response.data.token) {
                await AsyncStorage.setItem('authToken', response.data.token);
            }
        } catch (error) {
            console.error('Login error', error);
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {error ? <Text>{error}</Text> : null}
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

export default Login;
