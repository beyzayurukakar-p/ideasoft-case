import { StyleSheet } from 'react-native';
import { dimensions } from '../../../common/styling/dimensions';
import { commonStyles } from '../common.styles';

export const ITEM_HEIGHT = dimensions.measure(50);

export const categoryItemStyles = StyleSheet.create({
  ...commonStyles,
  container: {
    ...commonStyles.container,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: dimensions.measure(12),
  },
});
