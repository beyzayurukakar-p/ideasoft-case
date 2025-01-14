import { Platform, StyleSheet } from 'react-native';
import { dimensions } from '../../styling/dimensions';
import { COLORS } from '../../styling/colors';

export const floatingAddButtonStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: dimensions.measure(30),
    right: dimensions.measure(30),
    zIndex: 1000,
  },
  touchable: {
    backgroundColor: COLORS.primary,
    width: dimensions.measure(80),
    height: dimensions.measure(80),
    borderRadius: dimensions.measure(40),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.23,
    shadowRadius: 4,
    elevation: dimensions.elevation(4),
    borderWidth: 1,
    borderColor: Platform.OS === 'android' ? '#7A4FDD' : 'transparent',
  },
});
