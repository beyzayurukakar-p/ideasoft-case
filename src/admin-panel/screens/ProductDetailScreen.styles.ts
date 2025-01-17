import { StyleSheet } from 'react-native';
import { detailScreenStyles } from './_common/detailScreenStyles';
import { dimensions } from '../../common/styling/dimensions';
import { COLORS } from '../../common/styling/colors';

export const productDetailScreenStyles = StyleSheet.create({
  ...detailScreenStyles,
  scrollContentContainer: {
    paddingBottom: dimensions.measure(200),
  },
  imageContainer: {
    borderRadius: dimensions.borderRadius,
    borderWidth: dimensions.measure(2),
    borderColor: COLORS.border,
    height: dimensions.measure(70),
    width: dimensions.measure(70),
    overflow: 'hidden',
    marginRight: dimensions.measure(10),
  },
  image: {
    width: '102%',
    height: '102%',
  },
});
