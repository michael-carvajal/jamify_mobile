import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';
import { ThemedView } from './ThemedView';
import { Songsheet } from '../types/Songsheets';
import { useNavigation, NavigationProp } from '@react-navigation/native';

interface BestRatedProps {
  songSheets: Songsheet[];
}

const BestRated: React.FC<BestRatedProps> = ({ songSheets }) => {
  const navigation = useNavigation<NavigationProp<any>>();

  const handlePress = (songSheet: Songsheet) => {
    console.log('Pressed it');
    navigation.navigate('SongSheetDetails', { songSheet });
  };

  return (
    <View style={styles.container}>
      {songSheets.slice(17, 23).map((item, index) => (
        <Pressable key={`best rated ${index}`} onPress={() => handlePress(item)}>
          <ThemedView style={styles.item}>
            <ThemedText>{item.title}</ThemedText>
            {/* Render other song sheet details */}
          </ThemedView>
        </Pressable>
      ))}
    </View>
  );
};

export default BestRated;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    marginTop: 30,
    width: '100%',
  },
  item: {
    padding: 16,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
    flex: 1,
  },
});
