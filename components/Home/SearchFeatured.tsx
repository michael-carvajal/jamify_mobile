import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const SearchFeatured = () => {
  const featuredSubjects = ["Top 100", "For you", "Replay"];

  // Helper function to generate random gradient coordinates
  const getRandomGradientCoords = () => {
    return {
      start: { x: 0, y: Math.random() },
      end: { x: Math.random(), y: 1 },
    };
  };

  return (
    <ScrollView horizontal style={styles.container}>
      {featuredSubjects.map((feature, index) => {
        const { start, end } = getRandomGradientCoords(); // Generate random start and end points
        return (
          <View style={styles.card} key={`featured-${index}`}>
            <LinearGradient
              colors={['rgba(255,255,255,0.3)', 'rgba(50, 14, 1, 0.5)']}
              start={start}
              end={end}
              style={styles.gradient}
            >
              <Text style={styles.text}>{feature}</Text>
            </LinearGradient>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
  card: {
    height: 150,
    width: 140,
    borderRadius: 5,
    marginRight: 15,
    overflow: 'hidden',
  },
  gradient: {
    justifyContent: 'flex-end',
    padding: 10,
    height: '100%',
    width: '100%',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default SearchFeatured;
