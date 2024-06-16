import { ScrollView, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import {  useRoute } from '@react-navigation/native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useSongSheets } from '@/context/SongSheetContext';


const SearchResults = () => {
  const route = useRoute();
  const {songSheets} = useSongSheets();

  const {feature}  = route.params
  let filteredList;
  if (feature === "Top 100") {
    filteredList = songSheets.reverse();
  }
  return (
    <ScrollView style={styles.container}>
      {filteredList?.map((item, index) => (
        <Pressable key={`search-result-${index}`} onPress={() => {/* Handle press */ }}>
          <ThemedView style={styles.item}>
            <ThemedText>{item.title}</ThemedText>
            {/* Render other song sheet details if necessary */}
          </ThemedView>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default SearchResults;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    padding: 16,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
