import { StyleSheet } from 'react-native';
import { detailScreenStyles } from './detailScreen.styles';
import { dimensions } from '../../common/styling/dimensions';

export const categoryDetailScreenStyles = StyleSheet.create({
  ...detailScreenStyles,
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: dimensions.measure(5),
  },
  statusText: {
    ...detailScreenStyles.valueText,
  },
  statusCircle: {
    width: dimensions.measure(15),
    height: dimensions.measure(15),
    borderRadius: dimensions.measure(10),
  },
});
