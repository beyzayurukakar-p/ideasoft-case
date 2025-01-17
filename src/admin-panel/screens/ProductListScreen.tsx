import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useAppDispatch, useAppSelector } from '../../common/store';
import { productSelectors, productSlice } from '../states/productSlice';
import { Product } from '../types/product';
import ProductItem from '../components/product-item/ProductItem';
import { listScreenStyles as styles } from './_common/listScreenStyles';
import FullscreenLoading from '../../common/components/feedbacks/FullscreenLoading';
import FullscreenRetry from '../../common/components/feedbacks/FullscreenRetry';
import FloatingAddButton from '../../common/components/buttons/FloatingAddButton';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../common/navigation/rootNavigator';
import { useWarnedDelete } from '../hooks/useWarnedDelete';
import ProductListHeader from '../components/list-header/ProductListHeader';
import { dimensions } from '../../common/styling/dimensions';

/**
 * Screen component for displaying and managing products.
 *
 * This screen includes:
 * - A list of products with swipe-to-delete functionality.
 * - A floating button to add a new product.
 * - Loading and retry states.
 *
 * The component lifecycle includes:
 * - Fetching products on mount.
 * - Handling refresh and pagination.
 */
const ProductListScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigation<RootStackNavigationProp>();
  const products = useAppSelector(productSelectors.products);
  const isLoading = useAppSelector(productSelectors.isLoadingReadProducts);
  const isRefreshing = useAppSelector(productSelectors.isRefreshing);
  const isLastPage = useAppSelector(productSelectors.isLastPage);

  // Has reading failed
  const [isFailed, setIsFailed] = React.useState<boolean>(false);

  const { warnBeforeDelete, renderWarningModal } = useWarnedDelete();

  const _fetch = useCallback(() => {
    // Dispatch an action to read products (page 1)
    dispatch(
      productSlice.actions.readProducts({
        onError: () => {
          setIsFailed(true);
        },
      })
    );
  }, [dispatch]);

  useEffect(() => {
    // Read first page on mount
    _fetch();
  }, [_fetch]);

  const _retry = useCallback(() => {
    // Try to read categories again
    setIsFailed(false);
    _fetch();
  }, [_fetch]);

  const _onPressAddProduct = useCallback(() => {
    nav.navigate('AdminPanel', {
      screen: 'ProductForm',
      params: {},
    });
  }, [nav]);

  const _onRefresh = useCallback(() => {
    dispatch(productSlice.actions.refresh({}));
  }, [dispatch]);

  const _onEndReached = useCallback(() => {
    // Load next page
    if (products.length === 0) {
      // No-op if the first read hasn't happened yet
      return;
    }
    dispatch(productSlice.actions.readNextPage({}));
  }, [products, dispatch]);

  const _renderProductItem = useCallback(
    (params: { item: Product; index: number }) => {
      return (
        <ProductItem
          product={params.item}
          demonstrateSwipeOnStart={params.index === 0}
          warnBeforeDelete={warnBeforeDelete}
        />
      );
    },
    [warnBeforeDelete]
  );

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
        renderItem={_renderProductItem}
        estimatedItemSize={dimensions.measure(95)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContentContainer}
        ListHeaderComponent={ProductListHeader}
        ListFooterComponent={isLastPage ? null : ListFooterComponent}
        refreshing={isRefreshing}
        onRefresh={_onRefresh}
        onEndReached={_onEndReached}
        testID="product-list"
      />
      {renderWarningModal()}
      <FloatingAddButton
        onPress={_onPressAddProduct}
        testID={`product-add-button`}
      />
    </View>
  );
};

const ListFooterComponent = () => {
  return <ActivityIndicator />;
};

export default ProductListScreen;
