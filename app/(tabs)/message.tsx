import React from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useUser } from '@/context/UserContext';
import MainContainer from '@/components/Messages';

export default function Message() {
    const colorScheme = useColorScheme();
    const { user } = useUser();
    const insets = useSafeAreaInsets();
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{...styles.container, paddingTop: insets.top,  backgroundColor : Colors[colorScheme ?? 'light'].background }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}
        >

            {user ? <MainContainer /> : <ThemedText>Sign up to message your partners!</ThemedText>}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

});
