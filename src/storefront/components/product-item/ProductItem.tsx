import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import { Product } from '../../types/product';
import { createProductItemStyles as styles } from './ProductItem.styles';

type Product = any;

type ProductItemProps = {
  product: Product;
};

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { name, price1 } = product;
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
    >
      <View style={styles.imageContainer} />
      <View style={styles.bottomContainer}>
        <Text
          style={styles.productNameText}
          numberOfLines={1}
        >
          {name}
        </Text>
        <Text style={styles.priceText}>${price1.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
