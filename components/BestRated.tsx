import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';
import { ThemedView } from './ThemedView';

import { useNavigation } from '@react-navigation/native';

const BestRated = ({ songSheets }: any) => {
  const navigation = useNavigation();

  const handlePress = (songSheet : any) => {
    navigation.navigate('SongSheetDetails', { songSheet });
  };

  return (
    <FlatList
      data={songSheets.slice(17,23)}
      style={styles.container}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item)}>
          <ThemedView style={styles.item}>
            <ThemedText>{item.title}</ThemedText>
            {/* Render other song sheet details */}
          </ThemedView>
        </TouchableOpacity>
      )}
    />
  );
};

export default BestRated

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
        marginTop: 30,
        width: "100%",
        
        },
        item: {
        padding: 16,
        marginBottom:5,
        borderBottomWidth: 1,
        borderBottomColor: Colors.grey,
        flex: 1,
    },
})