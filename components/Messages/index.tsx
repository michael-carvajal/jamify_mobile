import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
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
    const handleMessageSend = useCallback(() => {
        if (message.trim()) {
            socket.send(message);
            addMessage(message);
            setMessage('');
        }
    }, [message, addMessage]);

    const renderItem = useCallback(({ item, index }) => (
        <ThemedText key={index} style={styles.messageText}>{item}</ThemedText>
    ), []);
    return (
        <>
            <ThemedText>Status: {isConnected ? 'connected' : 'disconnected'}</ThemedText>
            <ThemedText>Transport: {transport}</ThemedText>
            <FlatList
                    data={messages}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.messageContainer}
                    style={styles.messageContainer}
                />
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
        flexGrow: 1,
        padding: 10,
        alignSelf: 'flex-start',
        width: '100%'
    },
    messageText: {
        marginBottom: 5,
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