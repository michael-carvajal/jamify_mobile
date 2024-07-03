import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from '@/components/Login'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUser } from '@/context/UserContext';

const Profile = () => {
  const insets = useSafeAreaInsets();
  const {user} = useUser();
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Login />
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container : {
    padding: 10
  }
})