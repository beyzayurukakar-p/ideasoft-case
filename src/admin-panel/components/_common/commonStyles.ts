import { StyleSheet } from 'react-native';
import { COLORS } from '../../../common/styling/colors';
import { dimensions } from '../../../common/styling/dimensions';

export const commonStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.elevated,
    borderRadius: dimensions.borderRadius,
    marginBottom: dimensions.measure(8),
    flexDirection: 'row',
    marginHorizontal: dimensions.pageMargin,
    borderWidth: dimensions.measure(1),
    borderColor: COLORS.borderShadowy,
  },
  disabledContainer: {
    opacity: 0.5,
  },
  statusCircle: {
    width: dimensions.measure(10),
    height: dimensions.measure(10),
    borderRadius: dimensions.measure(5),
  },
  primaryText: {
    fontSize: dimensions.measure(16),
    color: COLORS.textOnBackground,
    fontWeight: '500',
    marginRight: dimensions.measure(15),
  },
});
