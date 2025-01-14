import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../styling/colors';
import { dimensions } from '../../styling/dimensions';

export type AppButtonAppearance = 'filled' | 'outlined' | 'textlink';

export const createAppButtonStyles = (appearance: AppButtonAppearance) => {
  const filledTouchableContainer: ViewStyle = {
    backgroundColor: COLORS.primary,
    height: dimensions.measure(50),
    borderRadius: dimensions.measure(25),
  };
  const outlinedTouchableContainer: ViewStyle = {
    height: dimensions.measure(50),
    borderRadius: dimensions.measure(25),
    borderWidth: dimensions.measure(1),
    borderColor: COLORS.border,
  };
  const textlinkTouchableContainer: ViewStyle = {};

  const touchableContainer =
    appearance === 'filled'
      ? filledTouchableContainer
      : appearance === 'outlined'
        ? outlinedTouchableContainer
        : textlinkTouchableContainer;

  const filledLabelText: TextStyle = {
    color: COLORS.textOnPrimary,
    fontWeight: '700',
    fontSize: dimensions.measure(14),
  };
  const outlinedLabelText: TextStyle = {
    color: COLORS.textOnBackground,
    fontWeight: '700',
    fontSize: dimensions.measure(14),
  };

  const labelText = appearance === 'filled' ? filledLabelText : outlinedLabelText;

  return StyleSheet.create({
    touchableContainer: {
      ...touchableContainer,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: dimensions.measure(20),
    },
    labelContainer: {
      flexGrow: 1,
      flexShrink: 1,
      alignItems: 'center',
    },
    labelText: {
      ...labelText,
    },
    iconContainer: {
      width: '10%',
    },
    icon: {
      height: dimensions.measure(20),
    },
  });
};
