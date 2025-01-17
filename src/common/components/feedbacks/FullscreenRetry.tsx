import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { COLORS } from '../../styling/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { dimensions } from '../../styling/dimensions';

type FullscreenRetryProps = {
  onPressRetry: () => void;
};

/**
 * FullscreenRetry component displays a full-screen retry button.
 * It is used to allow users to retry an action when an error occurs.
 */
const FullscreenRetry: React.FC<FullscreenRetryProps> = ({ onPressRetry }) => {
  return (
    <View style={styles.loadingContainer}>
      <TouchableOpacity
        onPress={onPressRetry}
        style={styles.touchableContainer}
        activeOpacity={0.5}
        testID={retryButtonTestID}
      >
        <Ionicons
          name="reload-circle-outline"
          size={dimensions.measure(40)}
          color={COLORS.primary}
        />
        <Text style={styles.text}>Tekrar dene</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  touchableContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLORS.primary,
    fontSize: dimensions.measure(20),
    fontWeight: '600',
    marginTop: dimensions.rowSpace,
  },
});

export const retryButtonTestID = 'retry-button';
export default FullscreenRetry;
