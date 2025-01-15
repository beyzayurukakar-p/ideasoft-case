import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Product } from '../../types/product';
import { productItemStyles as styles } from './ProductItem.styles';
import { COLORS } from '../../../common/styling/colors';
import { IMAGES } from '../../../common/assets';
import { productSlice } from '../../states/productSlice';
import SwipeableWithDelete from '../../../common/components/swipeable/SwipeableWithDelete';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../../common/store';

type ProductItemProps = {
  product: Product;
  demonstrateSwipeOnStart: boolean;
};

/**
 * This component is used by the product list as an item component.
 * Supports swiping left to view delete button.
 */
const ProductItem: React.FC<ProductItemProps> = ({ product, demonstrateSwipeOnStart }) => {
  const { id, name, price, sku, currencyAbbr, status, imageThumbUrl } = product;

  const dispatch = useAppDispatch();
  const nav = useNavigation();
  const [disabled, setDisabled] = useState<boolean>(false);

  const _onPressDelete = () => {
    setDisabled(true);
    dispatch(
      productSlice.actions.deleteProduct({
        id,
        onError: () => {
          setDisabled(false);
        },
      })
    );
  };

  const _onPressItem = () => {
    nav.navigate('AdminPanel', {
      screen: 'ProductDetail',
      params: {
        productId: id,
      },
    });
  };

  return (
    <View style={disabled ? styles.disabledContainer : null}>
      <SwipeableWithDelete
        demonstrateOnStart={demonstrateSwipeOnStart}
        disabled={disabled}
        onPressDelete={_onPressDelete}
      >
        <TouchableOpacity
          onPress={_onPressItem}
          style={styles.container}
          activeOpacity={0.6}
          disabled={disabled}
        >
          {/* image */}
          <View style={styles.imageContainer}>
            <Image
              source={imageThumbUrl ? { uri: imageThumbUrl } : IMAGES.nopic_image()}
              style={styles.image}
            />
          </View>
          <View style={styles.rightContainer}>
            {/* name */}
            <Text
              style={styles.primaryText}
              numberOfLines={1}
            >
              {name}
            </Text>

            {/* stock code */}
            <Text
              style={styles.stockCodeText}
              numberOfLines={1}
            >
              {sku}
            </Text>

            {/* price */}
            <Text style={styles.priceText}>
              {price.toFixed(2) + ' '}
              <Text style={styles.currencyText}>{currencyAbbr}</Text>
            </Text>
          </View>

          {/* status as a red/green circle */}
          <View
            style={[
              styles.statusCircle,
              {
                backgroundColor: status === 0 ? COLORS.danger : COLORS.success,
              },
            ]}
          />
        </TouchableOpacity>
      </SwipeableWithDelete>
    </View>
  );
};

export default ProductItem;
