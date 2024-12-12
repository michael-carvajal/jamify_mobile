import { ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { Link } from 'expo-router';

const SearchFeatured = () => {

  const featuredSubjects = ["Top 100", "For you", "Replay"];

  return (
    <ScrollView horizontal style={styles.container}>
      {featuredSubjects.map((feature, index) => (
        <Link style={styles.card} key={`featured-${index}`} href={{ pathname: 'SearchResults', params: { filter: feature } }}>
            <ThemedText>{feature}</ThemedText>
        </Link>
      ))}
    </ScrollView>
  );
};

export default SearchFeatured;

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
  card: {
    height: 150,
    width: 130,
    display : 'flex',
    borderRadius: 5,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
});
