import { ScrollView, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useSongSheets } from '@/context/SongSheetContext';


const SearchResults = () => {
  const route = useRoute();
  const { songSheets, artists, genres } = useSongSheets();

  const { filter } = route.params
  let filteredList;
  if (filter === "Top 100") {
    filteredList = songSheets.reverse();
  } else if (filter === "For you") {
    filteredList = [{ title: "Sign in to see songsheets just for you!" }]
  } else if (filter === "Replay") {
    filteredList = [{ title: "Sign in to see your replays!" }]
  } else if (filter === "Artist") {
    filteredList = artists.map(artist => ({ title: artist.name }))
  } else if (filter === "Genre") {
    filteredList = genres.map(genre => ({ title: genre.name }))
  } else if (filter === "Rock") {
    filteredList = songSheets.filter(song => {
      const rockID = genres.find(genre => genre.name === filter)?.id
      return song.genre_id === rockID;
    })
  } else if (filter === "Pop") {
    filteredList = songSheets.filter(song => {
      const rockID = genres.find(genre => genre.name === filter)?.id
      return song.genre_id === rockID;
    })
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
