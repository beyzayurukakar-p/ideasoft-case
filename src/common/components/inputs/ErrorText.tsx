import React from 'react';
import { Text, TextProps } from 'react-native';
import { errorTextStyles as styles } from './ErrorText.styles';

type ErrorTextProps = TextProps & {
  children: React.ReactNode;
};

/**
 * ErrorText component is used to display error messages in a styled Text component.
 * It accepts all TextProps and additional children prop for the error message content.
 */
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
