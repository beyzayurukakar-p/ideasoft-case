import { StyleSheet } from 'react-native';
import { dimensions } from '../../../common/styling/dimensions';
import { COLORS } from '../../../common/styling/colors';

export const ITEM_HEIGHT = dimensions.measure(100);
const IMAGE_SIZE = ITEM_HEIGHT * 0.7;

export const createProductItemStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.elevated,
    borderRadius: dimensions.borderRadius,
    marginVertical: dimensions.measure(3),
    padding: dimensions.measure(7),
    flexDirection: 'row',
  },
  imageContainer: {
    borderRadius: dimensions.borderRadius,
    backgroundColor: COLORS.primary,
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
  },
  rightContainer: {
    flexGrow: 1,
    rowGap: dimensions.measure(3),
    paddingHorizontal: dimensions.measure(10),
  },
  productNameText: {
    fontSize: dimensions.measure(16),
    color: COLORS.textOnBackground,
    fontWeight: '500',
  },
  stockCodeText: {
    fontSize: dimensions.measure(14),
    color: COLORS.subtextOnBackground,
    fontWeight: '600',
  },
  priceText: {
    position: 'absolute',
    fontSize: dimensions.measure(16),
    color: COLORS.primary,
    fontWeight: '500',
    bottom: 0,
    right: 0,
  },
  currencyText: {
    fontSize: dimensions.measure(14),
    color: COLORS.primary,
    fontWeight: '500',
    opacity: 0.7,
  },
  statusCircle: {
    width: dimensions.measure(10),
    height: dimensions.measure(10),
    borderRadius: dimensions.measure(5),
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
