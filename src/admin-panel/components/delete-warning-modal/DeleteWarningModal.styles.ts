import { StyleSheet } from 'react-native';
import { dimensions } from '../../../common/styling/dimensions';
import { COLORS } from '../../../common/styling/colors';

export const deleteWarningModalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.backdrop,
  },
  modalContent: {
    width: dimensions.measure(300),
    padding: dimensions.measure(20),
    backgroundColor: COLORS.elevated,
    borderRadius: dimensions.borderRadius,
    alignItems: 'center',
  },
  warningIconContainer: {
    marginBottom: dimensions.measure(20),
  },
  warningText: {
    marginBottom: dimensions.measure(20),
    fontSize: dimensions.measure(18),
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    columnGap: dimensions.measure(10),
  },
  cancelButton: {
    flex: 0.5,
    backgroundColor: COLORS.primaryPale,
  },
  deleteButton: {
    flex: 0.5,
    backgroundColor: COLORS.danger,
  },
});
