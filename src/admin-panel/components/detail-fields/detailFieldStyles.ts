import { StyleSheet } from 'react-native';
import { dimensions } from '../../../common/styling/dimensions';
import { COLORS } from '../../../common/styling/colors';

export const detailFieldStyles = StyleSheet.create({
  labelText: {
    fontSize: dimensions.measure(13),
    color: COLORS.primary,
    fontWeight: '600',
    opacity: 0.8,
  },
  valueText: {
    fontSize: dimensions.measure(16),
    color: COLORS.textOnBackground,
    fontWeight: '400',
  },
  valueTextLarge: {
    fontSize: dimensions.measure(24),
    color: COLORS.textOnBackground,
    fontWeight: '500',
  },
  labelValueContainerVertical: {
    rowGap: dimensions.measure(4),
    paddingHorizontal: dimensions.measure(2),
  },
  labelValueContainerHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: dimensions.measure(2),
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: dimensions.measure(5),
  },
  statusCircle: {
    width: dimensions.measure(15),
    height: dimensions.measure(15),
    borderRadius: dimensions.measure(10),
  },
  separator: {
    backgroundColor: COLORS.borderShadowy,
    height: dimensions.measure(1),
    marginVertical: dimensions.measure(15),
  },
});
