import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import Login from '@/components/Profile/Login';
import SignUp from '@/components/Profile/SignUp';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUser } from '@/context/UserContext';
import UserPage from '@/components/Profile/UserPage';
import { ThemedView } from '@/components/ThemedView';

const Profile = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const insets = useSafeAreaInsets();
  const { user } = useUser();

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      {user?.email ? (
        <UserPage />
      ) : (
        <>
          {isSignUp ? (
            <SignUp />
          ) : (
            <Login />
          )}
          <TouchableOpacity
            onPress={() => setIsSignUp(!isSignUp)}
            style={styles.toggleButton}
          >
            <Text style={styles.toggleButtonText}>
              {isSignUp ? 'Already have an account? Login' : 'No account yet? Sign up'}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </ThemedView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toggleButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  toggleButtonText: {
    color: '#007BFF',
  },
});
