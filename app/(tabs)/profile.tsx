import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from '@/components/Login'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUser } from '@/context/UserContext';
import UserPage from '@/components/UserPage';
import { ThemedView } from '@/components/ThemedView';

const Profile = () => {
  const insets = useSafeAreaInsets();
  const {user} = useUser();
  
  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      {user?.email ? <UserPage /> : <Login />}
    </ThemedView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container : {
    // padding: 10
    flex: 1
  }
})