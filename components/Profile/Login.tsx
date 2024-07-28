import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useUser } from '../../context/UserContext';
import InputField from '../InputField';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

const Login = () => {
    const { login } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            await login(email, password);
            setError('');
        } catch (err) {
            setError('Invalid email or password');
        }
    };
console.log(email, password);

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
        marginTop: 100,
    },
    loginInButton: {
        width: 150,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Login;
