import { StyleSheet } from 'react-native';
import { detailScreenStyles } from './detailScreen.styles';
import { dimensions } from '../../common/styling/dimensions';

export const productDetailScreenStyles = StyleSheet.create({
  ...detailScreenStyles,
  scrollContentContainer: {
    paddingBottom: dimensions.measure(200),
  },
});
