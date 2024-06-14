import { SearchBar } from '@/components/SearchBar';
import SearchFeatured from '@/components/SearchFeatured';
import { Image, StyleSheet, Platform, SafeAreaView, View, Keyboard, Text, FlatList, ScrollView, useWindowDimensions } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSongSheets } from '../../context/SongSheetContext';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from '@/components/ThemedText';
import BestRated from '@/components/BestRated';
import SearchCategories from '@/components/SearchCategories';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


let width;
export default function HomeScreen() {
  const { height, width } = useWindowDimensions();
  const { songSheets, loading, error } = useSongSheets();
  const insets = useSafeAreaInsets();

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Add your search logic here
  };
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  console.log(songSheets[0]);

  return (
    <ScrollView contentContainerStyle={{
      justifyContent: 'center',
      alignItems: 'center',
    }} showsVerticalScrollIndicator={false} style={[styles.container, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>



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