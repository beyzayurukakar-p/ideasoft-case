import React from 'react';
import { View, Text } from 'react-native';
import { useAppSelector } from '../../../common/store';
import { categorySelectors } from '../../states/categorySlice';
import CategoryItem from '../category-item/CategoryItem';
import { useWarnedDelete } from '../../hooks/useWarnedDelete';
import { listHeaderStyles as styles } from './listHeaderStyles';

const CategoryListHeader: React.FC = () => {
  const recentlyAddedCategories = useAppSelector(categorySelectors.recentlyAddedCategories);

  const { warnBeforeDelete, renderWarningModal } = useWarnedDelete();

  if (recentlyAddedCategories.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yeni Eklenenler</Text>
      {recentlyAddedCategories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          demonstrateSwipeOnStart={false}
          warnBeforeDelete={warnBeforeDelete}
        />
      ))}
      {renderWarningModal()}
    </View>
  );
};

export default CategoryListHeader;
