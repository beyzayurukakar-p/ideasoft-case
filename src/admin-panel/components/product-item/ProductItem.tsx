import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Product } from '../../types/product';
import { createProductItemStyles as styles } from './ProductItem.styles';
import { COLORS } from '../../../common/styling/colors';
import { IMAGES } from '../../../common/assets';

type ProductItemProps = {
  product: Product;
};

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { name, price, sku, currencyAbbr, status, imageThumbUrl } = product;

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
    >
      <View style={styles.imageContainer}>
        <Image
          source={imageThumbUrl ? { uri: imageThumbUrl } : IMAGES.nopic_image()}
          style={styles.image}
        />
      </View>
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
        <View
          style={[
            styles.statusCircle,
            {
              backgroundColor: status === 0 ? COLORS.danger : COLORS.success,
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
