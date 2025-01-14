import React from 'react';
import { TouchableOpacity, Text, ViewStyle } from 'react-native';
import { touchableTextStyles as styles } from './TouchableText.styles';

interface TouchableTextProps {
  label: string;
  leftIcon?: [React.ComponentType<any>, string];
  leftIconSize?: number;
  rightIcon?: [React.ComponentType<any>, string];
  rightIconSize?: number;
  onPress: () => void;
  disabled?: boolean;
  color?: string;
  style?: ViewStyle;
}

/**
 * `TouchableText`is a reusable touchable text component.
 * It can be customized with additional styles.
 */
const TouchableText: React.FC<TouchableTextProps> = ({
  label,
  leftIcon,
  leftIconSize,
  rightIcon,
  rightIconSize,
  onPress,
  color,
  style,
}) => {
  const _renderLeftIcon = () => {
    if (!leftIcon) {
      return null;
    }
    const LeftIconComponent = leftIcon[0];
    return (
      <LeftIconComponent
        name={leftIcon[1]}
        color={color || styles.labelText.color}
        size={leftIconSize || styles.icon.height}
      />
    );
  };

  const _renderRightIcon = () => {
    if (!rightIcon) {
      return null;
    }
    const RightIconComponent = rightIcon[0];
    return (
      <RightIconComponent
        name={rightIcon[1]}
        color={styles.labelText.color}
        size={rightIconSize || styles.icon.height}
      />
    );
  };

  return (
    <TouchableOpacity
      style={[styles.touchableContainer, style]}
      onPress={onPress}
      activeOpacity={0.5}
    >
      {_renderLeftIcon()}
      <Text
        style={[styles.labelText, color ? { color } : null]}
        numberOfLines={1}
      >
        {label}
      </Text>
      {_renderRightIcon()}
    </TouchableOpacity>
  );
};

export default TouchableText;
