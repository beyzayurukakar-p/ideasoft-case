import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { appTextInputStyles as styles } from './AppTextInput.styles';

type AppTextInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

const AppTextInput: React.FC<AppTextInputProps> = ({ label, value, onChangeText, placeholder }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  );
};

export default AppTextInput;
