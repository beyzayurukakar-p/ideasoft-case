import { StyleSheet } from 'react-native';
import { dimensions } from '../../../common/styling/dimensions';
import { COLORS } from '../../../common/styling/colors';

export const imageInputStyles = StyleSheet.create({
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
  itemContainer: {
    width: dimensions.measure(140),
    height: dimensions.measure(140),
    borderRadius: dimensions.borderRadius,
    marginRight: dimensions.measure(10),
    borderWidth: dimensions.measure(2),
    borderColor: COLORS.border,
    padding: dimensions.measure(5),
  },
  plusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.elevated,
    borderColor: COLORS.successTextOnBackground,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imageDeleteTouchable: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.dangerTextOnBackground,
    paddingVertical: dimensions.measure(8),
    paddingHorizontal: dimensions.measure(12),
    alignItems: 'center',
    borderTopLeftRadius: dimensions.borderRadius,
    borderBottomRightRadius: dimensions.borderRadius,
  },
});
