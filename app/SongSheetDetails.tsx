import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSongSheets } from '@/context/SongSheetContext';

const SongSheetDetails = () => {
  const colorScheme = useColorScheme();
  const  { artists} = useSongSheets();
  const route = useRoute();
  const { songSheet } = route.params;
  const artist = artists.find(artist => {
    console.log(artist.id, songSheet);
    return artist.id === songSheet.artist_id
  })
  
  console.log(artist);
  return (

    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: Colors[colorScheme ?? 'light'].background }}>

      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText style={styles.title}>{songSheet.title}</ThemedText>
          {/* <ThemedText style={{}}>album_id: {songSheet.album_id}</ThemedText> */}
          <ThemedText style={{}}>Artist: {artist?.name}</ThemedText>
          <ThemedText style={{}}>Created By: {songSheet.author_id}</ThemedText>
          {/* Add other song sheet details here */}
        </ThemedView>
        <ThemedText style={{}}>{songSheet.body}</ThemedText>
      </ThemedView>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  header: {
    display: 'flex',
    alignItems: 'flex-end'
  }
});

export default SongSheetDetails;
