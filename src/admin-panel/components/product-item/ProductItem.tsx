import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Product } from '../../types/product';
import { createProductItemStyles as styles } from './ProductItem.styles';
import { COLORS } from '../../../common/styling/colors';
import { IMAGES } from '../../../common/assets';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { dimensions } from '../../../common/styling/dimensions';
import { useDispatch } from 'react-redux';
import { productSlice } from '../../states/productSlice';

type ProductItemProps = {
  product: Product;
  flashSwipeable: boolean;
};

/**
 * This component is used by the product list as an item component.
 * Supports swiping left to view delete button.
 */
const ProductItem: React.FC<ProductItemProps> = ({ product, flashSwipeable }) => {
  const { id, name, price, sku, currencyAbbr, status, imageThumbUrl } = product;

  // To prevent flashes when order of products change
  const flashSwipeableRef = useRef(flashSwipeable);

  const dispatch = useDispatch();
  const swipeableRef = useRef<Swipeable>(null);
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    // Show a quick demo that item can be swiped
    if (!flashSwipeableRef.current) return;
    setTimeout(() => {
      swipeableRef?.current?.openRight();

      setTimeout(() => {
        swipeableRef?.current?.close();
      }, 1000);
    }, 500);
  }, []);

  const _onSwipeableOpen = () => {
    setTimeout(() => {
      swipeableRef?.current?.close();
    }, 2000);
  };

  const _onPressDelete = () => {
    setDisabled(true);
    swipeableRef.current?.close();
    dispatch(
      productSlice.actions.deleteProduct({
        id,
        onError: () => {
          setDisabled(false);
        },
      })
    );
  };

  const _renderRightActions = () => {
    return (
      <TouchableOpacity
        onPress={_onPressDelete}
        style={styles.deleteTouchable}
        disabled={disabled}
      >
        <FontAwesome5
          name="trash-alt"
          size={dimensions.measure(20)}
          color={COLORS.textOnPrimary}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={disabled ? styles.disabledContainer : null}>
      {/* 
      Using deprecated component 
      because there is an unfixed bug on new component
      that prevents running animations on mount
      */}
      <Swipeable
        renderRightActions={_renderRightActions}
        onSwipeableOpen={_onSwipeableOpen}
        ref={swipeableRef}
      >
        <TouchableOpacity
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
              style={styles.productNameText}
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

            {/* status as a red/green circle */}
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
      </Swipeable>
    </View>
  );
};

export default ProductItem;
