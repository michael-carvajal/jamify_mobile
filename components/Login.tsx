import React, { useEffect, useState } from 'react';
import { View, Text, Platform, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import InputField from './InputField';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const env = process.env.EXPO_PUBLIC_ENV;

    const apiUrl = env === "production" || Platform.OS === "ios" ? process.env.EXPO_PUBLIC_JAMIFY_API_URL : process.env.EXPO_PUBLIC_LOCAL_JAMIFY_API_URL;

    const parsedUrl = apiUrl?.split("/api")[0]
    // console.log(parsedUrl);

    const handleLogin = async () => {
        // const csrf = await AsyncStorage.getItem("csrf_token")
        // console.log(csrf);
        try {

            // const csrfToken = csrf
            const response = await axios.post(`${apiUrl!}/auth/login`, {
                email: email,
                password: password,
            });
            console.log("response.data ====> ", response);
            
            // if (response.data.token) {
            //     await AsyncStorage.setItem('authToken', response.data.token);
            // }
        } catch (error) {
            console.error('Login error', error);
        }
    };

    // console.log(AsyncStorage.getItem('authToken'));
    
    return (
        <View style={styles.container}>
            <InputField
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <InputField
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                isSecure={true}
            />
            {error ? <Text>{error}</Text> : null}
            <TouchableOpacity onPress={handleLogin}>
                <ThemedView style={styles.loginInButton}>
                    <ThemedText>Login</ThemedText>
                </ThemedView>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 25,
        marginTop: 100
    },
    loginInButton: {
        width: 150,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default Login;
