import { StyleSheet } from 'react-native';
import { dimensions } from '../../../common/styling/dimensions';

export const categoryPillsStyles = StyleSheet.create({
  categoriesContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: dimensions.measure(5),
  },
  categoryButton: {
    height: dimensions.measure(30),
  },
});
