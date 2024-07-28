import { SetStateAction, useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import { ThemedView } from "../ThemedView";

export const SearchBar = ({ onSearch }: any) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (text: SetStateAction<string>) => {
        setQuery(text);
        if (onSearch) {
            onSearch(text);
        }
    };

    return (
        <ThemedView style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search..."
                value={query}
                onChangeText={handleInputChange}
            />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 8,
        borderColor: '#ddd',
        borderWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 8,
        elevation: 2,
    },
    input: {
        height: 40,
        fontSize: 16,
    },
})

