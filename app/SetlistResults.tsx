import { ScrollView, StyleSheet, Pressable, View, Text } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useSetlists } from '@/context/SetlistContext';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Setlist } from '../types/Setlist';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Songsheet } from '@/types/SongSheets';

const SetlistResults = () => {
  const colorScheme = useColorScheme();
  const route = useRoute();
  const { id } = route.params
  const { setlistItems } = useSetlists();
  const navigation = useNavigation<NavigationProp<any>>();

  const handlePress = (songSheet: Songsheet) => {
    navigation.navigate('SongSheetDetails', { songSheet });
  };

  console.log('setlist id -==-=-=-> ', id);
  
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: Colors[colorScheme ?? 'light'].background }}>

    </ScrollView>
  );
};

export default SetlistResults;

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
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
  comingSoon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  comingSoonText: {
    fontSize: 32,
  },
});
