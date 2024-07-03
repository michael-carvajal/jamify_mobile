import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useUser } from '@/context/UserContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const UserPage: React.FC = () => {
  const { user, logout } = useUser();

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>User Profile</ThemedText>
      <View style={styles.userInfo}>
        <ThemedText style={styles.label}>Name:</ThemedText>
        <ThemedText style={styles.value}>{user?.username}</ThemedText>
      </View>
      <View style={styles.userInfo}>
        <ThemedText style={styles.label}>Email:</ThemedText>
        <ThemedText style={styles.value}>{user?.email}</ThemedText>
      </View>
      {/* Add more user info fields as needed */}
      <Button
        title="Logout"
        onPress={logout}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    flex: 1,
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default UserPage;
