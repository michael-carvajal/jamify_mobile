import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

const SearchFeatured = () => {
    const featuredSubjects = ["Top 100", "For you", "Replay"];

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
            {featuredSubjects.map((feature, ind) => {
                return (<ThemedView key={`featured-${ind}`} style={styles.card}>
                    <ThemedText>{feature}</ThemedText>
                </ThemedView>)
            })}
        </ScrollView>
    )
}

export default SearchFeatured

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        display: 'flex',
        marginTop: 25,
        overflow: "scroll",
        gap: 10
    },
    card: {
        // backgroundColor: Colors.grey,
        height: 150,
        width: 130,
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 5,
        marginRight: 10
    }
})