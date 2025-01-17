import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useAppDispatch, useAppSelector } from '../../common/store';
import { categorySelectors, categorySlice } from '../states/categorySlice';
import { Category } from '../types/category';
import CategoryItem from '../components/category-item/CategoryItem';
import { listScreenStyles as styles } from './_common/listScreenStyles';
import FullscreenLoading from '../../common/components/feedbacks/FullscreenLoading';
import FullscreenRetry from '../../common/components/feedbacks/FullscreenRetry';
import FloatingAddButton from '../../common/components/buttons/FloatingAddButton';
import { useWarnedDelete } from '../hooks/useWarnedDelete';
import { useNavigation } from '@react-navigation/native';
import CategoryListHeader from '../components/list-header/CategoryListHeader';
import { dimensions } from '../../common/styling/dimensions';

/**
 * Screen component for displaying and managing categories.
 *
 * This screen includes:
 * - A list of categories with swipe-to-delete functionality.
 * - A floating button to add a new category.
 * - Loading and retry states.
 *
 * The component lifecycle includes:
 * - Fetching categories on mount.
 * - Handling refresh and pagination.
 */
const CategoryListScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigation();
  const categories = useAppSelector(categorySelectors.categories);
  const isLoading = useAppSelector(categorySelectors.isLoadingReadCategories);
  const isRefreshing = useAppSelector(categorySelectors.isRefreshing);
  const isLastPage = useAppSelector(categorySelectors.isLastPage);

  // Has reading failed
  const [isFailed, setIsFailed] = React.useState<boolean>(false);

  const { warnBeforeDelete, renderWarningModal } = useWarnedDelete();

  const _fetch = useCallback(() => {
    // Dispatch an action to read categories (page 1)
    dispatch(
      categorySlice.actions.readCategories({
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

  const _onPressAddCategory = useCallback(() => {
    nav.navigate('AdminPanel', {
      screen: 'CategoryForm',
      params: {},
    });
  }, [nav]);

  const _onRefresh = useCallback(() => {
    dispatch(categorySlice.actions.refresh({}));
  }, [dispatch]);

  const _onEndReached = useCallback(() => {
    // Load next page
    if (categories.length === 0) {
      // No-op if the first read hasn't happened yet
      return;
    }
    dispatch(categorySlice.actions.readNextPage({}));
  }, [categories, dispatch]);

  const _renderCategoryItem = useCallback(
    (params: { item: Category; index: number }) => {
      return (
        <CategoryItem
          category={params.item}
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
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={_renderCategoryItem}
        estimatedItemSize={dimensions.measure(50)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContentContainer}
        ListHeaderComponent={CategoryListHeader}
        ListFooterComponent={isLastPage ? null : ListFooterComponent}
        refreshing={isRefreshing}
        onRefresh={_onRefresh}
        onEndReached={_onEndReached}
        testID={'category-list'}
      />
      <FloatingAddButton
        onPress={_onPressAddCategory}
        testID={`category-add-button`}
      />
      {renderWarningModal()}
    </View>
  );
};

const ListFooterComponent = () => {
  return <ActivityIndicator />;
};

export default CategoryListScreen;
