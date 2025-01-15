import { StyleSheet } from 'react-native';
import { dimensions } from '../../../common/styling/dimensions';
import { COLORS } from '../../../common/styling/colors';

export const categoryListHeaderStyles = StyleSheet.create({
  container: {
    borderBottomWidth: dimensions.measure(1),
    borderBottomColor: COLORS.border,
    marginBottom: dimensions.measure(10),
  },
  title: {
    fontSize: dimensions.measure(14),
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: dimensions.measure(5),
    marginHorizontal: dimensions.pageMargin,
  },
});
