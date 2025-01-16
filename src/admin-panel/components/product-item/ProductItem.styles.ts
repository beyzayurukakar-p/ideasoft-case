import { StyleSheet } from 'react-native';
import { dimensions } from '../../../common/styling/dimensions';
import { COLORS } from '../../../common/styling/colors';
import { commonStyles } from '../common.styles';

export const ITEM_HEIGHT = dimensions.measure(100);
const IMAGE_SIZE = ITEM_HEIGHT * 0.7;

export const productItemStyles = StyleSheet.create({
  ...commonStyles,
  container: {
    ...commonStyles.container,
    padding: dimensions.measure(7),
  },
  imageContainer: {
    borderRadius: dimensions.borderRadius,
    borderWidth: dimensions.measure(2),
    borderColor: COLORS.border,
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  rightContainer: {
    flexGrow: 1,
    flexShrink: 1,
    rowGap: dimensions.measure(3),
    paddingHorizontal: dimensions.measure(10),
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
    ...commonStyles.statusCircle,
    position: 'absolute',
    top: dimensions.measure(7),
    right: dimensions.measure(7),
  },
});
