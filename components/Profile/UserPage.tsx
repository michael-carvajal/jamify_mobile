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
      <View style={styles.card}>
        <View style={styles.userInfo}>
          <ThemedText style={styles.label}>Name:</ThemedText>
          <ThemedText style={styles.value}>{user?.username}</ThemedText>
        </View>
        <View style={styles.userInfo}>
          <ThemedText style={styles.label}>Email:</ThemedText>
          <ThemedText style={styles.value}>{user?.email}</ThemedText>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Logout"
            onPress={logout}
            color="#FF6B6B"
          />
        </View>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userInfo: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  label: {
    fontWeight: '600',
    width: 80,
    fontSize: 16,
  },
  value: {
    flex: 1,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 24,
  },
});

export default UserPage;
