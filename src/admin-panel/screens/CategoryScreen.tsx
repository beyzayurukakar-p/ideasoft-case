import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useAppDispatch, useAppSelector } from '../../common/store';
import { categorySelectors, categorySlice } from '../states/categorySlice';
import { Category } from '../types/category';
import CategoryItem from '../components/category-item/CategoryItem';
import { listScreenStyles as styles } from './listScreen.styles';
import FullscreenLoading from '../../common/components/loading/FullscreenLoading';
import FullscreenReload from '../../common/components/loading/FullscreenReload';
import FloatingAddButton from '../../common/components/floating-button/FloatingAddButton';

const CategoryScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(categorySelectors.categories);
  const isLoading = useAppSelector(categorySelectors.isLoadingReadCategories);
  const [isFailed, setIsFailed] = React.useState<boolean>(false);

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

  const _reload = () => {
    setIsFailed(false);
    _fetch();
  };

  const _onPressAddCategory = () => {};

  if (isLoading) {
    return <FullscreenLoading />;
  }

  if (isFailed) {
    return <FullscreenReload onPressReload={_reload} />;
  }

  return (
    <View style={styles.container}>
      <FlashList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCategoryItem}
        estimatedItemSize={250}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContentContainer}
      />
      <FloatingAddButton onPress={_onPressAddCategory} />
    </View>
  );
};

const renderCategoryItem = (params: { item: Category; index: number }) => {
  return (
    <CategoryItem
      category={params.item}
      demonstrateSwipeOnStart={params.index === 0}
    />
  );
};

export default CategoryScreen;
