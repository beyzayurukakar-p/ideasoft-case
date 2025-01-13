import { StyleSheet } from 'react-native';
import { dimensions } from '../../../common/styling/dimensions';
import { COLORS } from '../../../common/styling/colors';

export const swipeableWithDeleteStyles = StyleSheet.create({
  deleteTouchable: {
    backgroundColor: COLORS.danger,
    borderRadius: dimensions.borderRadius,
    marginTop: dimensions.measure(2),
    marginBottom: dimensions.measure(11),
    marginRight: dimensions.pageMargin,
    width: dimensions.measure(70),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
