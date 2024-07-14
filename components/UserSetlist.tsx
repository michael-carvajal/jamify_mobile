import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSetlists } from '@/context/SetlistContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

const UserSetlist = ({ user }: any) => {
    const { setlists, setlistItems, loading, error } = useSetlists()
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

    return (
        <ThemedView>
            {usersSetlists.map(setlist => {
                return (
                    <ThemedView style={styles.item}>
                        <ThemedText>{setlist.name}</ThemedText>
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