import { StyleSheet } from 'react-native';
import { COLORS } from '../../common/styling/colors';
import { dimensions } from '../../common/styling/dimensions';

export const detailScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.elevated,
    paddingHorizontal: dimensions.pageMargin,
    paddingTop: dimensions.pageMargin,
  },
  buttonsContainer: {
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
