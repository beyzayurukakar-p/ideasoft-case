import { StyleSheet } from 'react-native';
import { dimensions } from '../../../common/styling/dimensions';
import { COLORS } from '../../../common/styling/colors';

export const categorySearchStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    marginTop: dimensions.measure(15),
  },
  listContentContainer: {
    paddingBottom: dimensions.measure(200),
  },
  categoryNameText: {
    fontSize: dimensions.measure(16),
    fontWeight: '500',
    color: COLORS.textOnBackground,
    marginLeft: dimensions.measure(3),
  },
  fullscreenLoading: {
    backgroundColor: COLORS.elevated,
  },
  noResultContainer: {
    alignItems: 'center',
  },
  noResultText: {
    fontSize: dimensions.measure(18),
    fontWeight: '500',
    color: COLORS.subtextOnBackground,
  },
});
