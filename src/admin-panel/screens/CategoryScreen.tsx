import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useAppDispatch, useAppSelector } from '../../common/store';
import { categorySelectors, categorySlice } from '../states/categorySlice';
import { Category } from '../types/category';
import CategoryItem from '../components/category-item/CategoryItem';
import { listScreenStyles as styles } from './listScreen.styles';
import FullscreenLoading from '../../common/components/feedbacks/FullscreenLoading';
import FullscreenRetry from '../../common/components/feedbacks/FullscreenRetry';
import FloatingAddButton from '../../common/components/buttons/FloatingAddButton';
import { useWarnedDelete } from '../hooks/useWarnedDelete';
import { useNavigation } from '@react-navigation/native';
import CategoryListHeader from '../components/list-header/CategoryListHeader';
import { dimensions } from '../../common/styling/dimensions';

const CategoryScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigation();
  const categories = useAppSelector(categorySelectors.categories);
  const isLoading = useAppSelector(categorySelectors.isLoadingReadCategories);
  const isRefreshing = useAppSelector(categorySelectors.isRefreshing);
  const isLastPage = useAppSelector(categorySelectors.isLastPage);

  const [isFailed, setIsFailed] = React.useState<boolean>(false);

  const { warnBeforeDelete, renderWarningModal } = useWarnedDelete();

  const _fetch = useCallback(() => {
    dispatch(
      categorySlice.actions.readCategories({
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

  const _onPressAddCategory = () => {
    nav.navigate('AdminPanel', {
      screen: 'CategoryForm',
      params: {},
    });
  };

  const _onRefresh = () => {
    dispatch(categorySlice.actions.refresh({}));
  };

  const _onNextPage = () => {
    dispatch(categorySlice.actions.readNextPage({}));
  };

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
        onEndReached={_onNextPage}
      />
      <FloatingAddButton onPress={_onPressAddCategory} />
      {renderWarningModal()}
    </View>
  );
};

const ListFooterComponent = () => {
  return <ActivityIndicator />;
};

export default CategoryScreen;
