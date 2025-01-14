import { StyleSheet } from 'react-native';
import { dimensions } from '../../../common/styling/dimensions';
import { COLORS } from '../../../common/styling/colors';

export const formActionsStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingRight: dimensions.pageMargin,
    paddingLeft: dimensions.pageMargin * 1.4,
    paddingTop: dimensions.pageMargin,
    paddingBottom: dimensions.pageMargin,
    backgroundColor: COLORS.whiteBackdrop,
  },
  transparent: {
    opacity: 0.7,
  },
  innerContainer: {
    height: dimensions.measure(55),
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: dimensions.measure(10),
  },
  deleteButtonContainer: {
    backgroundColor: COLORS.elevated,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: dimensions.measure(6),
    paddingLeft: dimensions.measure(10),
    paddingVertical: dimensions.measure(15),
    borderRadius: dimensions.measure(30),
  },
  editButton: {
    flexGrow: 1,
  },
  loadingInnerContainer: {
    justifyContent: 'center',
  },
});
