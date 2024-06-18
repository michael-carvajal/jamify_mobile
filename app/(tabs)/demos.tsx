import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const Demos = () => {
    const insets = useSafeAreaInsets();

    return (
        <ScrollView contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
        }} showsVerticalScrollIndicator={false} style={[styles.container, { paddingTop: insets.top}]}>

            <ThemedView>
                <ThemedText>Demos</ThemedText>
            </ThemedView>
        </ScrollView>
    )
}

export default Demos

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
    },
  
  })