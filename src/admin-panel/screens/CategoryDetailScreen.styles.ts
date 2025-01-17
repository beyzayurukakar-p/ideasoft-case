import { StyleSheet } from 'react-native';
import { detailScreenStyles } from './_common/detailScreenStyles';
import { dimensions } from '../../common/styling/dimensions';

export const categoryDetailScreenStyles = StyleSheet.create({
  ...detailScreenStyles,
  seeProductTouchable: {
    marginTop: dimensions.measure(20),
  },
});
