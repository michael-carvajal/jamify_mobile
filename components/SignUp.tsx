import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import InputField from './InputField';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const apiUrl = process.env.EXPO_PUBLIC_JAMIFY_API_URL;

    const handleSignUp = async () => {
        const csrf = await AsyncStorage.getItem("csrf_token");
        console.log("csrf token =====>  ", csrf);
        try {
            const response = await fetch(`${apiUrl!}/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "csrf_token": csrf! },
                body: JSON.stringify({
                    username,
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    password
                })
            });

            const data = await response.json();
            console.log("sign-up response data ====> ", data);

            if (data.errors) {
                setError(data.errors.join(', '));
            } else {
                await AsyncStorage.setItem('authToken', data.token);
                // Navigate to the next screen or do something after successful sign-up
            }
        } catch (error) {
            console.error('Sign-up error', error);
            setError('An error occurred during sign-up. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <InputField
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <InputField
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />
            <InputField
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />
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
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TouchableOpacity onPress={handleSignUp}>
                <ThemedView style={styles.signUpButton}>
                    <ThemedText>Sign Up</ThemedText>
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
    signUpButton: {
        width: 150,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    }
});

export default SignUp;
