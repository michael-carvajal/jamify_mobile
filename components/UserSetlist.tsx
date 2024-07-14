import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSetlists } from '@/context/SetlistContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { Setlist } from '@/types/Setlist';

const UserSetlist = ({ user }: any) => {
    const { setlists, setlistItems, loading, error } = useSetlists()
    const navigation = useNavigation<NavigationProp<any>>();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ThemedText>Error: {error.message}</ThemedText>;
    }
    console.log(setlists, setlistItems);
    const usersSetlists = setlists.filter(setlist => setlist.author_id === user.id)
    console.log('users setlist =====> ', usersSetlists);
    if (usersSetlists.length === 0) {
        return <ThemedView>
            <ThemedText>Create a setlist</ThemedText>
        </ThemedView>
    }
    const handlePress = (setlistId: number) => {
        navigation.navigate('SetlistResults', { id : setlistId });
    };
    return (
        <ThemedView>
            {usersSetlists.map((setlist, index) => {
                return (
                    <ThemedView key={`userSetlist-key-${index}`} style={styles.item}>
                        <Pressable onPress={() => handlePress(setlist.id)}>
                            <ThemedText>{setlist.name}</ThemedText>
                        </Pressable>
                    </ThemedView>
                )
            })}
        </ThemedView>
    )
}

export default UserSetlist

const styles = StyleSheet.create({
    item: {
        padding: 16,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
})