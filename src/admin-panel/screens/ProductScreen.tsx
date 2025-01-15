import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useAppDispatch, useAppSelector } from '../../common/store';
import { productSelectors, productSlice } from '../states/productSlice';
import { Product } from '../types/product';
import ProductItem from '../components/product-item/ProductItem';
import { listScreenStyles as styles } from './listScreen.styles';
import FullscreenLoading from '../../common/components/feedbacks/FullscreenLoading';
import FullscreenRetry from '../../common/components/feedbacks/FullscreenRetry';
import FloatingAddButton from '../../common/components/buttons/FloatingAddButton';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../common/navigation/rootNavigator';

const ProductScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigation<RootStackNavigationProp>();
  const products = useAppSelector(productSelectors.products);
  const isLoading = useAppSelector(productSelectors.isLoadingReadProducts);
  const [isFailed, setIsFailed] = React.useState<boolean>(false);

  const _fetch = useCallback(() => {
    dispatch(
      productSlice.actions.readProducts({
        onError: () => {
          setIsFailed(true);
        },
      })
    );
  }, [dispatch]);

  useEffect(() => {
    _fetch();
  }, [_fetch]);

  const _retry = () => {
    setIsFailed(false);
    _fetch();
  };

  const _onPressAddProduct = () => {
    nav.navigate('AdminPanel', {
      screen: 'ProductForm',
      params: {},
    });
  };

  if (isLoading) {
    return <FullscreenLoading />;
  }

  if (isFailed) {
    return <FullscreenRetry onPressRetry={_retry} />;
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

const renderProductItem = (params: { item: Product; index: number }) => {
  return (
    <ProductItem
      product={params.item}
      demonstrateSwipeOnStart={params.index === 0}
    />
  );
};

export default ProductScreen;
