import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Product } from '../../types/product';
import { createProductItemStyles as styles } from './ProductItem.styles';

type ProductItemProps = {
  product: Product;
};

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { name, price, sku, currencyAbbr } = product;
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
    >
      <View style={styles.imageContainer} />
      <View style={styles.rightContainer}>
        <Text
          style={styles.productNameText}
          numberOfLines={1}
        >
          {name}
        </Text>
        <Text
          style={styles.stockCodeText}
          numberOfLines={1}
        >
          {sku}
        </Text>
        <Text style={styles.priceText}>
          {price.toFixed(2) + ' '}
          <Text style={styles.currencyText}>{currencyAbbr}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
