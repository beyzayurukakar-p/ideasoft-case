import { StyleSheet } from 'react-native';
import { dimensions } from '../../styling/dimensions';
import { COLORS } from '../../styling/colors';

export const appTextInputStyles = StyleSheet.create({
  container: {
    marginVertical: dimensions.measure(10),
  },
  input: {
    fontSize: dimensions.measure(16),
    color: COLORS.textOnBackground,
    fontWeight: '500',
    height: dimensions.measure(50),
    borderColor: COLORS.border,
    borderWidth: dimensions.measure(1),
    borderRadius: dimensions.borderRadius,
    backgroundColor: COLORS.elevated,
    paddingHorizontal: dimensions.measure(15),
  },
  inputWithError: {
    borderColor: COLORS.danger,
  },
});
