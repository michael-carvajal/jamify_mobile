import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useUser } from '@/context/UserContext';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import InputField from './InputField';

const SignUp = () => {
    const { signUp, error } = useUser();
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        await signUp(username, firstName, lastName, email, password);
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
