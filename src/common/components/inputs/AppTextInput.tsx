import React from 'react';
import { View, Text, TextInput, KeyboardTypeOptions } from 'react-native';
import { appTextInputStyles as styles } from './AppTextInput.styles';

type AppTextInputProps = {
  label: string;
  value?: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  errorText?: string | null;
  keyboardType?: KeyboardTypeOptions;
};

const AppTextInput: React.FC<AppTextInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  errorText,
  keyboardType,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, errorText ? styles.inputWithError : null]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
      {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
    </View>
  );
};

export default AppTextInput;
