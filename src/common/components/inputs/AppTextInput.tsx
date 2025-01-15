import React from 'react';
import { View, Text, TextInput, TextInputProps, LayoutChangeEvent } from 'react-native';
import { appTextInputStyles as styles } from './AppTextInput.styles';

type AppTextInputProps = TextInputProps & {
  label: string;
  value?: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  errorText?: string | null;
  onLayout?: (event: LayoutChangeEvent) => void;
};

const AppTextInput: React.FC<AppTextInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  errorText,
  onLayout,
  ...restProps
}) => {
  return (
    <View
      style={styles.container}
      onLayout={onLayout}
    >
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, errorText ? styles.inputWithError : null]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        {...restProps}
      />
      {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
    </View>
  );
};

export default AppTextInput;
