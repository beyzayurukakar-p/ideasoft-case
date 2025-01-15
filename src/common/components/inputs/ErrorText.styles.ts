import { StyleSheet } from 'react-native';
import { dimensions } from '../../styling/dimensions';
import { COLORS } from '../../styling/colors';

export const errorTextStyles = StyleSheet.create({
  text: {
    fontSize: dimensions.measure(14),
    color: COLORS.dangerTextOnBackground,
    fontWeight: '500',
    marginTop: dimensions.measure(3),
    marginLeft: dimensions.measure(1),
  },
});
