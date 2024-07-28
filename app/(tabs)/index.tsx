import { SearchBar } from '@/components/Home/SearchBar';
import SearchFeatured from '@/components/Home/SearchFeatured';
import { StyleSheet, Text, ScrollView, } from 'react-native';
import { useSongSheets } from '../../context/SongSheetContext';
import BestRated from '@/components/Home/BestRated';
import SearchCategories from '@/components/Home/SearchCategories';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';


export default function HomeScreen() {
  const { songSheets, loading, error } = useSongSheets();
  const colorScheme = useColorScheme();

  const insets = useSafeAreaInsets();

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Add your search logic here
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={ { paddingTop: insets.top,  backgroundColor : Colors[colorScheme ?? 'light'].background }}>

      <ThemedView style={[styles.container, {}]}>
        <SearchBar onSearch={handleSearch} />
        <SearchFeatured />
        <BestRated songSheets={songSheets} />
        <SearchCategories />
      </ThemedView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    //use this for background color debugging
  },
  container: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

})