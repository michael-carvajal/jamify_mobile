import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const SongSheetDetails = () => {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();

  const route = useRoute();
  const { songSheet } = route.params;
  return (

    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: Colors[colorScheme ?? 'light'].background }}>

      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText style={styles.title}>{songSheet.title}</ThemedText>
          <ThemedText style={{}}>album_id: {songSheet.album_id}</ThemedText>
          <ThemedText style={{}}>artist_id: {songSheet.artist_id}</ThemedText>
          <ThemedText style={{}}>author_id: {songSheet.author_id}</ThemedText>
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
