import { StyleSheet, Text, View, TextInput } from 'react-native';
import { socket } from '../../socket';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import InputField from '@/components/InputField';

export default function Message() {
    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState('N/A');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

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

        socket.on('message', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('message');
        };
    }, []);

    const handleMessageSend = () => {
        if (message.trim()) {
            socket.send(message);
            setMessage('');
        }
    };
    console.log(messages);

    return (
        <ThemedView style={styles.container}>
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
            <TouchableOpacity onPress={handleMessageSend}>
                <ThemedText>Send Message</ThemedText>
            </TouchableOpacity>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    messageContainer: {
        flex: 1,
        width: '100%',
        padding: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '80%',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});
