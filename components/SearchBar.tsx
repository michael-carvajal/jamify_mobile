import { Colors } from "@/constants/Colors";
import { SetStateAction, useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";

export const SearchBar = ({ onSearch }: any) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (text: SetStateAction<string>) => {
        setQuery(text);
        if (onSearch) {
            onSearch(text);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search..."
                value={query}
                onChangeText={handleInputChange}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 8,
        borderColor: '#ddd',
        borderWidth: 1,
        backgroundColor: Colors.grey,
        paddingHorizontal: 16,
        paddingVertical: 8,
        elevation: 2,
    },
    input: {
        height: 40,
        fontSize: 16,
        color: "#fff"
    },
})

