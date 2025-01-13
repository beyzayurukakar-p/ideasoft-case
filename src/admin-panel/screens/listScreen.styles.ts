import { StyleSheet } from 'react-native';
import { COLORS } from '../../common/styling/colors';
import { dimensions } from '../../common/styling/dimensions';

export const listScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingVertical: dimensions.measure(5),
  },
  listContentContainer: {
    paddingBottom: dimensions.measure(200),
  },
});
