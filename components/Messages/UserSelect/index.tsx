import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '../../ThemedText';
import { Colors } from '@/constants/Colors';
import { ThemedView } from '@/components/ThemedView';

interface UserSelectProps {
  visible: boolean;
  onClose: () => void;
  onSelectUser: (user: string) => void;
  availableUsers: string[];
}

const UserSelect = ({ visible, onClose, onSelectUser, availableUsers }: UserSelectProps) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <ThemedView style={styles.modalContent}>
          <ThemedText style={styles.modalTitle}>Select User</ThemedText>
          {availableUsers.map((user) => (
            <TouchableOpacity
              key={user}
              style={styles.userItem}
              onPress={() => {
                onSelectUser(user);
                onClose();
              }}
            >
              <ThemedText>{user}</ThemedText>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <ThemedText>Close</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: Colors.yellow,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default UserSelect; 