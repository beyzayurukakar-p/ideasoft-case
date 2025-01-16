import { StyleSheet } from 'react-native';
import { detailScreenStyles } from './detailScreen.styles';
import { dimensions } from '../../common/styling/dimensions';

export const productDetailScreenStyles = StyleSheet.create({
  ...detailScreenStyles,
  scrollContentContainer: {
    paddingBottom: dimensions.measure(200),
  },
  imageItem: {
    width: dimensions.measure(70),
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
    borderRadius: dimensions.borderRadius,
    marginRight: dimensions.measure(10),
  },
});
