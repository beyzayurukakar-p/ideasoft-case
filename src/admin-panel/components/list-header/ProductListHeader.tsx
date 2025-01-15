import React from 'react';
import { View, Text } from 'react-native';
import { useAppSelector } from '../../../common/store';
import { productSelectors } from '../../states/productSlice';
import ProductItem from '../product-item/ProductItem';
import { useWarnedDelete } from '../../hooks/useWarnedDelete';
import { listHeaderStyles as styles } from './listHeaderStyles';

const ProductListHeader: React.FC = () => {
  const recentlyAddedProducts = useAppSelector(productSelectors.recentlyAddedProducts);

  const { warnBeforeDelete, renderWarningModal } = useWarnedDelete();

  if (recentlyAddedProducts.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yeni Eklenenler</Text>
      {recentlyAddedProducts.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          demonstrateSwipeOnStart={false}
          warnBeforeDelete={warnBeforeDelete}
        />
      ))}
      {renderWarningModal()}
    </View>
  );
};

export default ProductListHeader;
