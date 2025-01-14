import { StyleSheet } from 'react-native';
import { COLORS } from '../../styling/colors';
import { dimensions } from '../../styling/dimensions';

export const touchableTextStyles = StyleSheet.create({
  touchableContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  labelText: {
    color: COLORS.textLink,
    fontWeight: '600',
    fontSize: dimensions.measure(14),
    marginHorizontal: dimensions.measure(7),
  },
  icon: {
    height: dimensions.measure(18),
  },
});
