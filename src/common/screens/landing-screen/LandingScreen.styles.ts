import { StyleSheet } from 'react-native';
import { dimensions } from '../../styling/dimensions';
import { COLORS } from '../../styling/colors';

export const landingScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  button: {
    width: dimensions.measure(200),
    height: dimensions.measure(200),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: dimensions.measure(10),
    backgroundColor: COLORS.primary,
    borderRadius: dimensions.borderRadius,
  },
  buttonText: {
    fontSize: dimensions.measure(20),
    color: COLORS.textOnPrimary,
    fontWeight: '700',
  },
});
