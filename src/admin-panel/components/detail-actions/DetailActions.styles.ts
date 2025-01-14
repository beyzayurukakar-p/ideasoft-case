import { StyleSheet } from 'react-native';
import { dimensions } from '../../../common/styling/dimensions';

export const detailActionsStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: dimensions.pageMargin * 2,
    right: dimensions.pageMargin,
    bottom: 0,
    paddingBottom: dimensions.pageMargin,
    flexDirection: 'row',
    columnGap: dimensions.measure(15),
  },
  editButton: {
    flexGrow: 1,
  },
});
