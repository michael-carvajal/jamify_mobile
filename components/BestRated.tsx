import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';
import { ThemedView } from './ThemedView';

import { useNavigation } from '@react-navigation/native';

const BestRated = ({ songSheets }: any) => {
  const navigation = useNavigation();

  const handlePress = (songSheet: any) => {
    console.log('ipressed ittt');

    navigation.navigate('SongSheetDetails', { songSheet });
  };

  return (
    <View
      style={styles.container}
    >
      {songSheets.slice(17, 23).map((item, index: number) => (
        <Pressable key={`best rated ${index}`} onPress={() => handlePress(item.title)}>
          <ThemedView style={styles.item}>
            <ThemedText>{item.title}</ThemedText>
            {/* Render other song sheet details */}
          </ThemedView>
        </Pressable>)
      )}
    </View>
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
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
    flex: 1,
  },
})