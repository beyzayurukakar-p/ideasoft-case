import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { readProducts } from '../../services/readProducts';
import { useService } from '../../../common/services/useService';

const ProductScreen: React.FC = () => {
  const { data, request: requestReadProducts } = useService(readProducts);

  useEffect(() => {
    requestReadProducts();
  }, [requestReadProducts]);

  console.log(data);

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
