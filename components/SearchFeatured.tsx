import { ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Link } from 'expo-router';

const SearchFeatured = () => {

  const featuredSubjects = ["Top 100", "For you", "Replay"];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {featuredSubjects.map((feature, index) => (
        <Link key={`featured-${index}`} href={{ pathname: 'SearchResults', params: { filter: feature } }}>
          <ThemedView style={styles.card}>
            <ThemedText>{feature}</ThemedText>
          </ThemedView>
        </Link>
      ))}
    </ScrollView>
  );
};

export default SearchFeatured;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 25,
  },
  card: {
    height: 150,
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
});
