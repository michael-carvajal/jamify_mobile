import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedText } from '../ThemedText'
import { ThemedView } from '../ThemedView'
import InputField from '../InputField'
import useMessages from '@/hooks/useMessages';
import { socket } from '../../socket';
import { Colors } from '@/constants/Colors'


const MainContainer = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState('N/A');
    const [message, setMessage] = useState('');
    const { messages, addMessage, clearMessages } = useMessages();

    useEffect(() => {
        if (socket.connected) {
            onConnect();
        }

        function onConnect() {
            setIsConnected(true);
            setTransport(socket.io.engine.transport.name);

            socket.io.engine.on('upgrade', (transport) => {
                setTransport(transport.name);
            });
        }

        function onDisconnect() {
            setIsConnected(false);
            setTransport('N/A');
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        socket.on('connect_error', (error: Error) => {
            console.log('Connection Error:', error.message);
        });

        socket.on('connect_timeout', (timeout: number) => {
            console.log('Connection Timeout:', timeout);
        });

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('message');
            socket.off('connect_error');
            socket.off('connect_timeout');
        };
    }, []);
    const handleMessageSend = () => {
        if (message.trim()) {
            socket.send(message);
            addMessage(message);
            setMessage('');
        }
    };
    return (
        <>
            <ThemedText>Status: {isConnected ? 'connected' : 'disconnected'}</ThemedText>
            <ThemedText>Transport: {transport}</ThemedText>
            <ThemedView style={styles.messageContainer}>
                {messages.map((msg, index) => (
                    <ThemedText key={index}>{msg}</ThemedText>
                ))}
            </ThemedView>
            <InputField
                value={message}
                onChangeText={setMessage}
                placeholder="Type a message"
            />
            <TouchableOpacity onPress={handleMessageSend} style={styles.button}>
                <ThemedText style={styles.buttonText}>Send Message</ThemedText>
            </TouchableOpacity>
        </>
    )
}

export default MainContainer

const styles = StyleSheet.create({
    messageContainer: {
        flex: 1,
        width: '100%',
        padding: 10,
    },
    button: {
        backgroundColor: Colors.yellow,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: Colors.grey,
        fontSize: 16,
    },
})