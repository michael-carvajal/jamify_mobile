import { SearchBar } from '@/components/SearchBar';
import SearchFeatured from '@/components/SearchFeatured';
import { StyleSheet, Text, ScrollView, } from 'react-native';
import { useSongSheets } from '../../context/SongSheetContext';
import BestRated from '@/components/BestRated';
import SearchCategories from '@/components/SearchCategories';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LoadingSpinner from '@/components/LoadingSpinner';


let width;
export default function HomeScreen() {
  const { songSheets, loading, error } = useSongSheets();
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
  console.log(songSheets[0]);

  return (
    <ScrollView contentContainerStyle={{
      justifyContent: 'center',
      alignItems: 'center',
    }} showsVerticalScrollIndicator={false} style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>



      <SearchBar onSearch={handleSearch} />
      <SearchFeatured />
      <BestRated songSheets={songSheets} />
      <SearchCategories />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    //use this for background color debugging
  },
  container: {
    maxWidth: width,
    paddingHorizontal: 16,

  },

})