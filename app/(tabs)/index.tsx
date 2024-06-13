import { SearchBar } from '@/components/SearchBar';
import SearchFeatured from '@/components/SearchFeatured';
import { Image, StyleSheet, Platform, SafeAreaView, View, Keyboard, Text, FlatList } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSongSheets } from '../../context/SongSheetContext';
import { Colors } from '@/constants/Colors';




export default function HomeScreen() {
  const { songSheets, loading, error } = useSongSheets();

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
    <TouchableWithoutFeedback onPress={dismissKeyboard}>

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <SearchBar onSearch={handleSearch} />
          <SearchFeatured />
          <FlatList
          showsVerticalScrollIndicator={false}
            data={songSheets}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              console.log(item.title);
              
              return (
              <View style={styles.item}>
                <Text style={styles.itemText}>{item.title}</Text>
              </View>
            )}}
          />
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
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
  },
  itemText : {
    color: "white"
  }
})