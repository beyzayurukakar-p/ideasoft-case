import { StyleSheet } from 'react-native';
import { dimensions } from '../../styling/dimensions';
import { COLORS } from '../../styling/colors';

export const appTextInputStyles = StyleSheet.create({
  container: {
    marginVertical: dimensions.measure(10),
  },
  label: {
    marginBottom: dimensions.measure(5),
    fontSize: dimensions.measure(14),
    color: COLORS.labelTextOnBackground,
    fontWeight: '600',
  },
  input: {
    fontSize: dimensions.measure(16),
    height: dimensions.measure(50),
    borderColor: COLORS.border,
    borderWidth: dimensions.measure(1),
    borderRadius: dimensions.borderRadius,
    backgroundColor: COLORS.elevated,
    paddingHorizontal: dimensions.measure(15),
  },
});
