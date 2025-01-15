import React from 'react';
import { Text, TextProps } from 'react-native';
import { labelStyles as styles } from './Label.styles';

type LabelProps = TextProps & {
  children: React.ReactNode;
};

const Label: React.FC<LabelProps> = ({ children, style, ...props }) => {
  return (
    <Text
      style={[styles.text, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default Label;
