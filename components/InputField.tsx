import { StyleSheet, TextInput, View, useColorScheme } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import { ThemedView } from './ThemedView';

interface InputFieldProps {
  value: string;
  onChangeText: Dispatch<SetStateAction<string>>;
  placeholder?: string;
  isSecure?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ value, onChangeText, placeholder, isSecure }) => {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'light' ? 'black' : 'white';

  return (
    <ThemedView style={styles.container}>
      <TextInput
        style={[styles.input, { color: textColor }]}
        placeholder={placeholder}
        placeholderTextColor={colorScheme === 'light' ? '#aaa' : '#555'}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
      />
    </ThemedView>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    elevation: 2,
  },
  input: {
    height: 40,
    fontSize: 16,
  },
});
