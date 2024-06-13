import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';

const BestRated = ({ songSheets }) => {
    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={songSheets}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
                console.log(item.title);

                return (
                    <View style={styles.item}>
                        <ThemedText>{item.title}</ThemedText>
                    </View>
                )
            }}
        />
    )
}

export default BestRated

const styles = StyleSheet.create({
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.grey,
    },
})