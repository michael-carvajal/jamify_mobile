import { SearchBar } from '@/components/SearchBar';
import SearchFeatured from '@/components/SearchFeatured';
import { Image, StyleSheet, Platform, SafeAreaView, View } from 'react-native';



export default function HomeScreen() {
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Add your search logic here
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <SearchBar onSearch={handleSearch} />
        <SearchFeatured />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    //use this for background color debugging
  },
  container: {
    paddingTop: Platform.OS === 'android' ? 30 : 0, // Add padding for Android
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
})