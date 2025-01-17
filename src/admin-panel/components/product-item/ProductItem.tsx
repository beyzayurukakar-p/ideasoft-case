import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
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

  /** Whether to demonstrate swipeability on mount. */
  demonstrateSwipeOnStart: boolean;

  /** A function to warn before deleting the category. */
  warnBeforeDelete: (onDelete: () => void) => void;
};

/**
 * A component that displays a product item with swipe-to-delete functionality.
 * It shows the product image, name, stock code, price, and status,
 * and allows navigation to the product detail screen.
 */
const ProductItem: React.FC<ProductItemProps> = ({
  product,
  demonstrateSwipeOnStart,
  warnBeforeDelete,
}) => {
  const { id, name, price, sku, currencyAbbr, status, images } = product;

  const dispatch = useAppDispatch();
  const nav = useNavigation();
  const [disabled, setDisabled] = useState<boolean>(false);

  const _onPressDelete = () => {
    warnBeforeDelete(() => {
      setDisabled(true);
      dispatch(
        productSlice.actions.deleteProduct({
          id,
          onError: () => {
            setDisabled(false);
          },
        })
      );
    });
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
        testID={`delete-product-${id}`}
      >
        <TouchableOpacity
          onPress={_onPressItem}
          style={styles.container}
          activeOpacity={0.6}
          disabled={disabled}
          testID={`product-item-${id}`}
        >
          {/* image */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: images?.[0]?.url }}
              placeholder={IMAGES.nopic_image()}
              style={styles.image}
              contentFit="fill"
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
