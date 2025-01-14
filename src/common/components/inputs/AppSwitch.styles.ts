import { StyleSheet } from 'react-native';
import { dimensions } from '../../styling/dimensions';
import { COLORS } from '../../styling/colors';

export const appSwitchStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: dimensions.measure(10),
  },
  label: {
    fontSize: dimensions.measure(14),
    color: COLORS.labelTextOnBackground,
    fontWeight: '600',
  },
});
