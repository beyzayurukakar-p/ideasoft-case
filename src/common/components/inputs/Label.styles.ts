import { StyleSheet } from 'react-native';
import { dimensions } from '../../styling/dimensions';
import { COLORS } from '../../styling/colors';

export const labelStyles = StyleSheet.create({
  text: {
    marginBottom: dimensions.measure(5),
    fontSize: dimensions.measure(14),
    color: COLORS.labelTextOnBackground,
    fontWeight: '600',
  },
});
