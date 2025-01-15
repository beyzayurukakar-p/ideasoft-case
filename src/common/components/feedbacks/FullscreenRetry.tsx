import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { COLORS } from '../../styling/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { dimensions } from '../../styling/dimensions';

type FullscreenRetryProps = {
  onPressRetry: () => void;
};

const FullscreenRetry: React.FC<FullscreenRetryProps> = ({ onPressRetry }) => {
  return (
    <View style={styles.loadingContainer}>
      <TouchableOpacity
        onPress={onPressRetry}
        style={styles.touchableContainer}
        activeOpacity={0.5}
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

export default FullscreenRetry;
