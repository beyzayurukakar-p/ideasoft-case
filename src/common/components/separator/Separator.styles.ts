import { StyleSheet } from 'react-native';
import { dimensions } from '../../../common/styling/dimensions';
import { COLORS } from '../../../common/styling/colors';

export const separatorStyles = StyleSheet.create({
  separator: {
    backgroundColor: COLORS.borderShadowy,
    height: dimensions.measure(1),
    marginVertical: dimensions.measure(15),
  },
});
