import { StyleSheet } from 'react-native';
import { dimensions } from '../../styling/dimensions';

export const appSwitchStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: dimensions.measure(10),
  },
  label: {
    marginBottom: 0,
  },
});
