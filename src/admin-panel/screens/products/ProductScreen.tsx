import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../common/store';
import { productSelectors, productSlice } from '../../states/productSlice';

const ProductScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(productSelectors.products);
  const isLoading = useAppSelector(productSelectors.isLoadingGetProducts);

  useEffect(() => {
    dispatch(productSlice.actions.getProducts({}));
  }, [dispatch]);

  console.log(products);

  return (
    <View style={styles.container}>
      <Text>{isLoading ? 'loading' : 'Product Screen'}</Text>
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
