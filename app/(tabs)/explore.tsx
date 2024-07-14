import { StyleSheet, Image, Platform } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useUser } from '@/context/UserContext';
import { useSetlists } from '@/context/SetlistContext';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function TabTwoScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const { user } = useUser();
  const { setlists, setlistItems, loading, error } = useSetlists()
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ThemedText>Error: {error.message}</ThemedText>;
  }
  console.log(setlists, setlistItems);

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top, backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Setlists</ThemedText>
      </ThemedView>
      {!user ? <ThemedText>Sign in to view your setlists!</ThemedText> : <>
        <ThemedText>This app includes example code to help you get started.</ThemedText>
        <Collapsible title="Animations">
          <ThemedText>
            This template includes an example of an animated component. The{' '}
            <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
            the powerful <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText> library
            to create a waving hand animation.
          </ThemedText>
          {Platform.select({
            ios: (
              <ThemedText>
                The <ThemedText type="defaultSemiBold">components/ThemedView.tsx</ThemedText>{' '}
                component provides a parallax effect for the header image.
              </ThemedText>
            ),
          })}
        </Collapsible>
      </>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  container: {
    flex: 1
  }
});
