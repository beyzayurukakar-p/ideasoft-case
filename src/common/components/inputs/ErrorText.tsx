import React from 'react';
import { Text, TextProps } from 'react-native';
import { errorTextStyles as styles } from './ErrorText.styles';

type ErrorTextProps = TextProps & {
  children: React.ReactNode;
};

const ErrorText: React.FC<ErrorTextProps> = ({ children, style, ...props }) => {
  return (
    <Text
      style={[styles.text, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default ErrorText;
