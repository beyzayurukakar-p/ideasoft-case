import { StyleSheet } from 'react-native';
import { COLORS } from '../../common/styling/colors';
import { dimensions } from '../../common/styling/dimensions';

export const detailScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.elevated,
    paddingHorizontal: dimensions.pageMargin,
    paddingTop: dimensions.pageMargin,
  },
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
  separator: {
    backgroundColor: COLORS.borderShadowy,
    height: dimensions.measure(1),
    marginVertical: dimensions.measure(15),
  },
  buttonsContainer: {
    position: 'absolute',
    left: dimensions.pageMargin * 2,
    right: dimensions.pageMargin,
    bottom: 0,
    paddingBottom: dimensions.pageMargin,
    flexDirection: 'row',
    columnGap: dimensions.measure(15),
  },
  editButton: {
    flexGrow: 1,
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
});
