import React, { useState } from 'react';
import { TouchableOpacity, Text, ViewStyle, View } from 'react-native';
import { AppButtonAppearance, createAppButtonStyles } from './AppButton.styles';

interface AppButtonProps {
  label: string;
  leftIcon?: [React.ComponentType<any>, string];
  leftIconSize?: number;
  rightIcon?: [React.ComponentType<any>, string];
  rightIconSize?: number;
  onPress: () => void;
  disabled?: boolean;
  appearance?: AppButtonAppearance;
  style?: ViewStyle;
  testID?: string;
}

/**
 *`AppButton` is a reusable button component.
 * It supports different visual styles and can be customized with additional styles.
 */
const AppButton: React.FC<AppButtonProps> = ({
  label,
  leftIcon,
  leftIconSize,
  rightIcon,
  rightIconSize,
  onPress,
  appearance = 'filled',
  style,
  testID,
}) => {
  const [styles] = useState(() => {
    return createAppButtonStyles(appearance);
  });

  /*
   When left or right icon exists, we still want to center the text.
   So, no icon containers will be rendered if there are no icons.
   But both icon containers will be rendered even if only one icon exists.
   */
  const noIcons = !leftIcon && !rightIcon;

  const _renderLeftIcon = () => {
    if (!leftIcon) {
      return null;
    }
    const LeftIconComponent = leftIcon[0];
    return (
      <LeftIconComponent
        name={leftIcon[1]}
        color={styles.labelText.color}
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
      activeOpacity={appearance === 'filled' ? 0.8 : 0.5}
      testID={testID}
    >
      {noIcons ? null : <View style={styles.iconContainer}>{_renderLeftIcon()}</View>}
      <View style={styles.labelContainer}>
        <Text
          style={styles.labelText}
          numberOfLines={1}
        >
          {label}
        </Text>
      </View>
      {noIcons ? null : <View style={styles.iconContainer}>{_renderRightIcon()}</View>}
    </TouchableOpacity>
  );
};

export default AppButton;
