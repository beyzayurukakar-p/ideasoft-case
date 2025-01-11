import { StyleSheet } from 'react-native';
import { dimensions } from '../../styling/dimensions';

const LOGO_ASPECT_RATIO = 114 / 36;

export const storefrontHeaderLeftStyles = StyleSheet.create({
  container: {
    paddingLeft: dimensions.pageMargin,
  },
  image: {
    width: dimensions.measure(100),
    height: undefined,
    aspectRatio: LOGO_ASPECT_RATIO,
  },
});
