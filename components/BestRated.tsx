import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';
import { ThemedView } from './ThemedView';

const BestRated = ({ songSheets }: any) => {
    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={songSheets}
            style={styles.container}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
                console.log(item.title);

                return (
                    <ThemedView style={styles.item}>
                        <ThemedText>{item.title}</ThemedText>
                    </ThemedView>
                )
            }}
        />
    )
}

export default BestRated

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
        marginTop: 30,
        
        },
        item: {
        display: 'flex',
        gap: 5,
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.grey,
        flex: 1
    },
})