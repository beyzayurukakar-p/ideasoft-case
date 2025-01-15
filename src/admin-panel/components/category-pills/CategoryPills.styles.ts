import { StyleSheet } from 'react-native';
import { dimensions } from '../../../common/styling/dimensions';
import { COLORS } from '../../../common/styling/colors';

export const categoryPillsStyles = StyleSheet.create({
  categoriesContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: dimensions.measure(5),
  },
  categoryButton: {
    height: dimensions.measure(30),
    backgroundColor: COLORS.elevated,
  },
});
