import { StyleSheet } from 'react-native';
import { dimensions } from '../../styling/dimensions';
import { COLORS } from '../../styling/colors';

export const dropdownStyles = StyleSheet.create({
  container: {
    marginVertical: dimensions.measure(10),
  },
  label: {
    marginBottom: dimensions.measure(5),
    fontSize: dimensions.measure(14),
    color: COLORS.labelTextOnBackground,
    fontWeight: '600',
  },
  input: {
    fontSize: dimensions.measure(16),
    color: COLORS.textOnBackground,
    fontWeight: '500',
    height: dimensions.measure(50),
    borderColor: COLORS.border,
    borderWidth: dimensions.measure(1),
    borderRadius: dimensions.borderRadius,
    backgroundColor: COLORS.elevated,
    paddingHorizontal: dimensions.measure(15),
    justifyContent: 'center',
  },
  inputWithError: {
    borderColor: COLORS.danger,
  },
  inputText: {
    fontSize: dimensions.measure(16),
    color: COLORS.textOnBackground,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.backdrop,
  },
  modalContent: {
    maxHeight: dimensions.percentOfHeight(40),
    backgroundColor: COLORS.elevated,
    borderRadius: dimensions.borderRadius,
    paddingVertical: dimensions.pageMargin,
    paddingHorizontal: dimensions.pageMargin * 2,
  },
  option: {
    paddingVertical: dimensions.measure(10),
    paddingHorizontal: dimensions.measure(25),
  },
  optionText: {
    fontSize: dimensions.measure(16),
    color: COLORS.textOnBackground,
    alignSelf: 'center',
  },
  separator: {
    backgroundColor: COLORS.borderShadowy,
    height: dimensions.measure(1),
  },
  checkIconContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: dimensions.measure(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: dimensions.measure(14),
    color: COLORS.dangerTextOnBackground,
    fontWeight: '500',
    marginTop: dimensions.measure(3),
    marginLeft: dimensions.measure(1),
  },
});
