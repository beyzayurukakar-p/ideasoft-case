import { StyleSheet } from 'react-native';
import { dimensions } from '../../../common/styling/dimensions';
import { COLORS } from '../../../common/styling/colors';

export const detailActionsStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingRight: dimensions.pageMargin,
    paddingLeft: dimensions.pageMargin * 2,
    paddingTop: dimensions.pageMargin,
    paddingBottom: dimensions.pageMargin,
    backgroundColor: COLORS.elevated,
  },
  transparent: {
    opacity: 0.7,
  },
  innerContainer: {
    height: dimensions.measure(55),
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: dimensions.measure(15),
  },
  editButton: {
    flexGrow: 1,
  },
  loadingInnerContainer: {
    justifyContent: 'center',
  },
});
