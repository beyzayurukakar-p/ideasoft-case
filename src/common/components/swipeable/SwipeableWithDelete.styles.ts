import { StyleSheet } from 'react-native';
import { dimensions } from '../../../common/styling/dimensions';
import { COLORS } from '../../../common/styling/colors';

export const swipeableWithDeleteStyles = StyleSheet.create({
  deleteTouchable: {
    backgroundColor: COLORS.danger,
    borderRadius: dimensions.borderRadius,
    marginVertical: dimensions.measure(6),
    marginRight: dimensions.pageMargin,
    width: dimensions.measure(70),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
