import React from 'react';
import { View, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../styling/colors';

type FullscreenLoadingProps = { style?: ViewStyle };

const FullscreenLoading: React.FC<FullscreenLoadingProps> = ({ style }) => {
  return (
    <View style={[styles.loadingContainer, style]}>
      <ActivityIndicator
        size="large"
        color={COLORS.primary}
      />
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
});

export default FullscreenLoading;
