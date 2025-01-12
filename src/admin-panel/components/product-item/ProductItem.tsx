import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Product } from '../../types/product';

type ProductItemProps = {
  product: Product;
};

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { name, images, price1 } = product;
  return (
    <View style={styles.productItem}>
      {images.length > 0 && (
        <Image
          source={{ uri: images[0].thumbUrl }}
          style={styles.productImage}
        />
      )}
      <Text style={styles.productName}>{name}</Text>
      <Text style={styles.productPrice}>${price1.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  productItem: {
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
  },
});

export default ProductItem;
