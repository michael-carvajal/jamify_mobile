import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const SongSheetDetails = () => {
  const route = useRoute();
  const { songSheet } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{songSheet.title}</Text>
      {/* Add other song sheet details here */}
    </View>
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
});

export default SongSheetDetails;
