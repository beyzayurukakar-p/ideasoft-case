import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { useAppSelector } from '../../../common/store';
import { categorySelectors } from '../../states/categorySlice';
import CategoryItem from '../category-item/CategoryItem';
import { useWarnedDelete } from '../../hooks/useWarnedDelete';
import { listHeaderStyles as styles } from './listHeaderStyles';
import { Category } from '../../types/category';

/**
 * CategoryListHeader component displays a list of recently added categories.
 * If there are no recently added categories, it returns null.
 * It selects the recently added categories from the Redux store.
 * It also uses the `useWarnedDelete` hook to handle delete warnings.
 */
const CategoryListHeader: React.FC = () => {
  const recentlyAddedCategories = useAppSelector(categorySelectors.recentlyAddedCategories);

  const { warnBeforeDelete, renderWarningModal } = useWarnedDelete();

  const _renderCategoryItem = useCallback(
    (category: Category) => (
      <CategoryItem
        key={category.id}
        category={category}
        demonstrateSwipeOnStart={false}
        warnBeforeDelete={warnBeforeDelete}
      />
    ),
    [warnBeforeDelete]
  );

  if (recentlyAddedCategories.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yeni Eklenenler</Text>
      {recentlyAddedCategories.map(_renderCategoryItem)}
      {renderWarningModal()}
    </View>
  );
};

export default CategoryListHeader;
