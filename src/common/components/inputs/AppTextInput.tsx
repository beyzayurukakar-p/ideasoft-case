import React from 'react';
import { View, TextInput, TextInputProps, LayoutChangeEvent, ViewStyle } from 'react-native';
import { appTextInputStyles as styles } from './AppTextInput.styles';
import Label from './Label';
import ErrorText from './ErrorText';

type AppTextInputProps = TextInputProps & {
  label?: string;
  value?: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  errorText?: string | null;
  onLayout?: (event: LayoutChangeEvent) => void;
  style?: ViewStyle;
};

const AppTextInput: React.FC<AppTextInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  errorText,
  onLayout,
  style,
  ...restProps
}) => {
  return (
    <View
      style={[styles.container, style]}
      onLayout={onLayout}
    >
      {label ? <Label>{label}</Label> : null}
      <TextInput
        style={[styles.input, errorText ? styles.inputWithError : null]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        {...restProps}
      />
      {errorText ? <ErrorText>{errorText}</ErrorText> : null}
    </View>
  );
};

export default AppTextInput;
