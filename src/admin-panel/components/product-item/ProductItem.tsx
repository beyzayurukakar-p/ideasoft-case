import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Product } from '../../types/product';
import { createProductItemStyles as styles } from './ProductItem.styles';
import { COLORS } from '../../../common/styling/colors';
import { IMAGES } from '../../../common/assets';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { dimensions } from '../../../common/styling/dimensions';

type ProductItemProps = {
  product: Product;
  flashSwipeable: boolean;
};

/**
 * This component is used by the product list as an item component.
 * Supports swiping left to view delete button.
 */
const ProductItem: React.FC<ProductItemProps> = ({ product, flashSwipeable }) => {
  const { name, price, sku, currencyAbbr, status, imageThumbUrl } = product;

  const swipeableRef = useRef<Swipeable>(null);

  useEffect(() => {
    // Show a quick demo that item can be swiped
    if (!flashSwipeable) return;
    setTimeout(() => {
      swipeableRef?.current?.openRight();

      setTimeout(() => {
        swipeableRef?.current?.close();
      }, 1000);
    }, 500);
  }, [flashSwipeable]);

  const _onPressDelete = () => {
    swipeableRef.current?.close();
  };

  const _renderRightActions = () => {
    return (
      <TouchableOpacity
        onPress={_onPressDelete}
        style={styles.deleteTouchable}
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
    /*
      Using deprecated component because
      there is an unfixed bugon new component
      that prevents running animations on mount
    */
    <Swipeable
      renderRightActions={_renderRightActions}
      ref={swipeableRef}
    >
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.6}
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
  );
};

export default ProductItem;
