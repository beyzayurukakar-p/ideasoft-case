import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useAppDispatch, useAppSelector } from '../../../common/store';
import { productSelectors, productSlice } from '../../states/productSlice';
import { Product } from '../../types/product';
import ProductItem from '../../components/product-item/ProductItem';
import { productScreenStyles as styles } from './ProductScreen.styles';
import FullscreenLoading from '../../../common/components/loading/FullscreenLoading';
import FullscreenReload from '../../../common/components/loading/FullscreenReload';
import FloatingAddButton from '../../../common/components/floating-button/FloatingAddButton';

const ProductScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(productSelectors.products);
  const isLoading = useAppSelector(productSelectors.isLoadingGetProducts);
  const [isFailed, setIsFailed] = React.useState<boolean>(false);

  const _fetch = useCallback(() => {
    dispatch(
      productSlice.actions.getProducts({
        onError: () => {
          setIsFailed(true);
        },
      })
    );
  }, [dispatch]);

  useEffect(() => {
    _fetch();
  }, [_fetch]);

  const _reload = () => {
    setIsFailed(false);
    _fetch();
  };

  const _onPressAddProduct = () => {};

  if (isLoading) {
    return <FullscreenLoading />;
  }

  if (isFailed) {
    return <FullscreenReload onPressReload={_reload} />;
  }

  return (
    <View style={styles.container}>
      <FlashList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
        estimatedItemSize={250}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContentContainer}
      />
      <FloatingAddButton onPress={_onPressAddProduct} />
    </View>
  );
};

const renderProductItem = (params: { item: Product }) => {
  return <ProductItem product={params.item} />;
};

export default ProductScreen;
