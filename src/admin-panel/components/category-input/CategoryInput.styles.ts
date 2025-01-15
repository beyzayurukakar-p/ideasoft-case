import { StyleSheet } from 'react-native';
import { dimensions } from '../../../common/styling/dimensions';
import { COLORS } from '../../../common/styling/colors';

export const categoryInputStyles = StyleSheet.create({
  container: {
    marginVertical: dimensions.measure(10),
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addTouchable: {
    backgroundColor: COLORS.elevated,
    borderWidth: dimensions.measure(2),
    borderColor: COLORS.primary,
    borderRadius: dimensions.measure(20),
    height: dimensions.measure(35),
    width: dimensions.measure(35),
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: dimensions.measure(2),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    height: dimensions.percentOfHeight(95),
    width: dimensions.width,
    backgroundColor: COLORS.elevated,
    paddingVertical: dimensions.pageMargin,
    paddingHorizontal: dimensions.pageMargin * 2,
    borderWidth: dimensions.measure(2),
    borderColor: COLORS.border,
    borderTopLeftRadius: dimensions.measure(20),
    borderTopRightRadius: dimensions.measure(20),
  },
});
