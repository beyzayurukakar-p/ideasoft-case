import { StyleSheet } from 'react-native';
import { dimensions } from '../../common/styling/dimensions';
import { COLORS } from '../../common/styling/colors';

export const formScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: dimensions.pageMargin,
    backgroundColor: COLORS.background,
  },
  scrollContentContainer: {
    paddingBottom: dimensions.percentOfHeight(40),
  },
});
