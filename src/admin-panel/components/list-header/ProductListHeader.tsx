import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { useAppSelector } from '../../../common/store';
import { productSelectors } from '../../states/productSlice';
import ProductItem from '../product-item/ProductItem';
import { useWarnedDelete } from '../../hooks/useWarnedDelete';
import { listHeaderStyles as styles } from './listHeaderStyles';
import { Product } from '../../types/product';

/**
 * `ProductListHeader` component displays a list of recently added products.
 * If there are no recently added products, it returns null.
 * It selects the recently added products from the Redux store.
 * It also uses the `useWarnedDelete` hook to handle delete warnings.
 */
const ProductListHeader: React.FC = () => {
  const recentlyAddedProducts = useAppSelector(productSelectors.recentlyAddedProducts);

  const { warnBeforeDelete, renderWarningModal } = useWarnedDelete();

  const _renderProductItem = useCallback(
    (product: Product) => (
      <ProductItem
        key={product.id}
        product={product}
        demonstrateSwipeOnStart={false}
        warnBeforeDelete={warnBeforeDelete}
      />
    ),
    [warnBeforeDelete]
  );

  if (recentlyAddedProducts.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yeni Eklenenler</Text>
      {recentlyAddedProducts.map(_renderProductItem)}
      {renderWarningModal()}
    </View>
  );
};

export default ProductListHeader;
