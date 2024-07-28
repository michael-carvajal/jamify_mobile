import { StyleSheet, Text, View, TextInput } from 'react-native';
import { socket } from '../../socket';
import { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import InputField from '@/components/InputField';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useUser } from '@/context/UserContext';

export default function Message() {
    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState('N/A');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const colorScheme = useColorScheme();
    const { user } = useUser();

    const insets = useSafeAreaInsets();

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
        <ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: insets.top, backgroundColor: Colors[colorScheme ?? 'light'].background }}>

            <ThemedView style={styles.container}>
               {user ? <>
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
                </> : <ThemedText>Sign up to message your partners!</ThemedText>}
            </ThemedView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
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

});
