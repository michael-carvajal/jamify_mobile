import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Platform, Pressable } from 'react-native';
import React from 'react';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';
import { Link } from 'expo-router';

const screenWidth = Dimensions.get('window').width;
const numColumns = 2;

const availableSpace = screenWidth - 30; // 20 for padding (10 on each side)
const itemSize = availableSpace / numColumns;

const SearchCategories = () => {
    const categories = ["Artist", "Rock", "Pop", "Country", "Folk", "Decades"];

    const handlePress = (item: string) => {
        console.log(`You pressed the ${item} button`);
    };

    const renderItems = (item: string, index: number) => (
        <Link key={`search-cat-${index}`} href={{pathname : "SearchResults", params : {filter : item}}}>
            <Pressable  onPress={() => handlePress(item)} style={[styles.item, { height: itemSize, width: itemSize }]}>
                <ThemedView style={styles.card}>
                    <ThemedText style={styles.cardName}>{item}</ThemedText>
                </ThemedView>
            </Pressable>
        </Link>
    );

    return (
        <View style={styles.container}>
            {categories.map((item, index) => {
                if (index % numColumns === 0) {
                    // Create a row with numColumns items
                    const items = categories.slice(index, index + numColumns);
                    return (
                        <View key={`row-${index}`} style={styles.row}>
                            {items.map((item, subIndex) => renderItems(item, index + subIndex))}
                        </View>
                    );
                }
                return null;
            })}
        </View>
    );
};

export default SearchCategories;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 40
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10
    },
    item: {
        marginBottom: 10, // Adjust the bottom margin to your preference
    },
    card: {
        backgroundColor: Colors.red,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 10,
        height: '100%'
    },
    cardName :{
        fontWeight: 'bold',
        fontSize : 18
    }
});
