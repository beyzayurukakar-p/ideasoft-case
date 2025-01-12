import { Dimensions, Platform } from 'react-native';

/** Globally used dimension utilities and constants */

const window = Dimensions.get('window');
const width = Math.min(window?.width, window?.height);
const height = Math.max(window?.width, window?.height);
const designWidth = 393; // Width of a screen in design file

const isScreenRatioSmall = height / width < 1.8;
const isScreenRatioLarge = height / width >= 2.3;

const correctionCoef = isScreenRatioSmall ? 0.9 : isScreenRatioLarge ? 1.1 : 1;

const measure = (designSize: number): number => {
  return (designSize / designWidth) * width * correctionCoef;
};
const percentOfWidth = (percentage: number): number => {
  return (percentage / 100) * width;
};
const percentOfHeight = (percentage: number): number => {
  return (percentage / 100) * height;
};
const elevation = (e: number | string): number => {
  return measure(Number(Platform.Version) >= 28 ? Number(e) : Number(e) / 3);
};

/**
 * An object containing various dimension-related utility functions and constants.
 */
export const dimensions = {
  /** A function to measure a size responsive to the screen size. */
  measure,

  /** A function to calculate a size as a percentage of width. */
  percentOfWidth,

  /** A function to calculate a size as a percentage of height. */
  percentOfHeight,

  /** A function to get the width of the screen. */
  width,

  /** A function to get the height of the screen. */
  height,
  pageMarginLarge: measure(30),
  pageMargin: measure(15),
  elevation,
  isScreenRatioSmall,
  isScreenRatioLarge,
  rowSpace: measure(12),
  borderRadius: measure(10),
};

export type AppDimensions = typeof dimensions;
