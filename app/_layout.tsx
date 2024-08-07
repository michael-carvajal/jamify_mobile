import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SongSheetProvider } from '../context/SongSheetContext'; // Adjust the path as necessary
import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import { UserProvider } from '@/context/UserContext';
import { SetlistProvider } from '@/context/SetlistContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const headerBackTitle = Platform.OS === 'ios' ? 'Back' : '';

  return (
    <GestureHandlerRootView>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <UserProvider>

          <SongSheetProvider>
            <SetlistProvider>

              <SafeAreaProvider>
                <Stack>
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen
                    name="SongSheetDetails"
                    options={{ headerBackTitle }}
                  />
                  <Stack.Screen
                    name="SearchResults"
                    options={{ headerBackTitle }}
                  />
                  <Stack.Screen
                    name="+not-found"
                  />
                </Stack>
              </SafeAreaProvider>
            </SetlistProvider>
          </SongSheetProvider>
        </UserProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
