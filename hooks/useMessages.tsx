import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'MESSAGE_HISTORY';

const useMessages = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const storedMessages = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedMessages) {
          setMessages(JSON.parse(storedMessages));
        }
      } catch (error) {
        console.error('Failed to load messages from storage', error);
      }
    };

    loadMessages();
  }, []);

  const addMessage = async (message: string) => {
    const newMessages = [...messages, message];
    setMessages(newMessages);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newMessages));
    } catch (error) {
      console.error('Failed to save message to storage', error);
    }
  };

  const clearMessages = async () => {
    setMessages([]);
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear messages from storage', error);
    }
  };

  return {
    messages,
    addMessage,
    clearMessages,
  };
};

export default useMessages;
