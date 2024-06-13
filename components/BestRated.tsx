import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';
import { ThemedView } from './ThemedView';

const BestRated = ({ songSheets }: any) => {
    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={songSheets.slice(17,23)}
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
        width: "100%",
        
        },
        item: {
        padding: 16,
        marginBottom:5,
        borderBottomWidth: 1,
        borderBottomColor: Colors.grey,
        flex: 1,
    },
})