import { StyleSheet } from 'react-native';
import { dimensions } from '../../../common/styling/dimensions';
import { COLORS } from '../../../common/styling/colors';

const IMAGE_HEIGHT = dimensions.measure(200);
const BOTTOM_HEIGHT = dimensions.measure(70);
export const ITEM_HEIGHT = IMAGE_HEIGHT + BOTTOM_HEIGHT;

export const createProductItemStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.elevated,
    borderRadius: dimensions.borderRadius,
    margin: dimensions.measure(7),
  },
  imageContainer: {
    height: IMAGE_HEIGHT,
    overflow: 'hidden',
    borderTopLeftRadius: dimensions.borderRadius,
    borderTopRightRadius: dimensions.borderRadius,
    backgroundColor: COLORS.primary,
  },
  bottomContainer: {
    height: BOTTOM_HEIGHT,
    justifyContent: 'space-between',
    rowGap: dimensions.measure(3),
    paddingHorizontal: dimensions.measure(10),
    paddingTop: dimensions.measure(7),
    paddingBottom: dimensions.measure(10),
  },
  productNameText: {
    fontSize: dimensions.measure(16),
    color: COLORS.textOnBackground,
    fontWeight: '500',
  },
  priceText: {
    fontSize: dimensions.measure(22),
    color: COLORS.primary,
    alignSelf: 'flex-end',
    fontWeight: '500',
  },
});
