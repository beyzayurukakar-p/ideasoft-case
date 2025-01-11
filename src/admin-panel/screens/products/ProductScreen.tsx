import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Product Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default ProductScreen;
