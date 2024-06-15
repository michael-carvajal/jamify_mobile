import { Colors } from '@/constants/Colors';
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const LoadingSpinner = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color={Colors.yellow} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default LoadingSpinner;