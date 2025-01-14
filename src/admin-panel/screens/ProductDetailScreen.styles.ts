import { StyleSheet } from 'react-native';
import { detailScreenStyles } from './detailScreen.styles';
import { dimensions } from '../../common/styling/dimensions';

export const productDetailScreenStyles = StyleSheet.create({
  ...detailScreenStyles,
  categoriesContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: dimensions.measure(5),
  },
  categoryButton: {
    height: dimensions.measure(30),
  },
  scrollContentContainer: {
    paddingBottom: dimensions.measure(200),
  },
});
