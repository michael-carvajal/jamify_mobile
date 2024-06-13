import { SearchBar } from '@/components/SearchBar';
import SearchFeatured from '@/components/SearchFeatured';
import { Image, StyleSheet, Platform, SafeAreaView, View, Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';



export default function HomeScreen() {
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Add your search logic here
  };
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <SearchBar onSearch={handleSearch} />
          <SearchFeatured />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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