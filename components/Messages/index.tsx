import { FlatList, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import InputField from '../InputField'
import useMessages from '@/hooks/useMessages';
import { socket } from '../../socket';
import { Colors } from '@/constants/Colors'
import { ThemedText } from '../ThemedText'
import UserSelect from './UserSelect';


const MainContainer = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState('N/A');
    const [message, setMessage] = useState('');
    const { messages, addMessage, clearMessages } = useMessages();
    const [selectedUser, setSelectedUser] = useState(null);
    const [showUserSelect, setShowUserSelect] = useState(false);
    const [availableUsers, setAvailableUsers] = useState([]);

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

        socket.on('users_list', (users) => {
            setAvailableUsers(users);
        });

        socket.on('private_message', (data) => {
            addMessage(`${data.from}: ${data.message}`);
        });

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('message');
            socket.off('connect_error');
            socket.off('connect_timeout');
            socket.off('users_list');
            socket.off('private_message');
        };
    }, []);
    const handleMessageSend = useCallback(() => {
        if (message.trim() && selectedUser) {
            socket.emit('private_message', {
                to: selectedUser,
                message: message
            });
            addMessage(message, 'Me', selectedUser);
            setMessage('');
        }
    }, [message, addMessage, selectedUser]);

    const renderItem = useCallback(({ item }: { item: Message }) => (
        <ThemedText style={styles.messageText}>
            {item.to ? `${item.from} (to ${item.to}): ` : `${item.from}: `}{item.text}
        </ThemedText>
    ), []);

    return (
        <>
            <ThemedText>Status: {isConnected ? 'connected' : 'disconnected'}</ThemedText>
            <ThemedText>Transport: {transport}</ThemedText>
            <TouchableOpacity
                style={styles.userSelectButton}
                onPress={() => setShowUserSelect(true)}
            >
                <ThemedText>
                    {selectedUser ? `Chatting with: ${selectedUser}` : 'Select User'}
                </ThemedText>
            </TouchableOpacity>
            <UserSelect
                visible={showUserSelect}
                onClose={() => setShowUserSelect(false)}
                onSelectUser={setSelectedUser}
                availableUsers={availableUsers}
            />

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
    userSelectButton: {
        padding: 10,
        backgroundColor: Colors.yellow,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
})