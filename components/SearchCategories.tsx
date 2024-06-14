import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Platform, Pressable } from 'react-native';
import React from 'react';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';

const screenWidth = Dimensions.get('window').width;
const numColumns = 2;

const availableSpace = screenWidth - 20; // 20 for padding (10 on each side)
const itemSize = availableSpace / numColumns;

const SearchCategories = () => {
    const categories = ["Artist", "Rock", "Pop", "Country", "Jazz", "Folk", "Decades"];

    const handlePress = (item: string) => {
        console.log(`You pressed the ${item} button`);
        alert(`You pressed the ${item} button`);
    };

    const renderItems = (item: string, index: number) => (
        <Pressable key={`search-cat-${index}`} onPress={() => handlePress(item)} style={[styles.item, { height: itemSize, width: itemSize }]}>
            <ThemedView style={styles.card}>
                <ThemedText>{item}</ThemedText>
            </ThemedView>
        </Pressable>
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
        paddingHorizontal: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    item: {
        marginBottom: 10, // Adjust the bottom margin to your preference
    },
    card: {
        backgroundColor: Colors.red,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 10,
    },
});
