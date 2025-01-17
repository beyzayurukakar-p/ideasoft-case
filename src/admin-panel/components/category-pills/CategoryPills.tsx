import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Category } from '../../types/category';
import AppButton from '../../../common/components/buttons/AppButton';
import { categoryPillsStyles as styles } from './CategoryPills.styles';

type CategoryPillsProps = {
  categories?: Category[];
  onPress?: (id: number) => void;
};

/**
 * CategoryPills component displays a list of categories as pills.
 * Each pill is a button that can be pressed to trigger an action.
 */
const CategoryPills: React.FC<CategoryPillsProps> = ({ categories, onPress }) => {
  const _renderPill = useCallback(
    (category: Category) => (
      <AppButton
        key={category.id}
        label={category.name}
        onPress={() => onPress?.(category.id)}
        appearance="outlined"
        style={styles.categoryButton}
      />
    ),
    [onPress]
  );

  return <View style={styles.categoriesContainer}>{categories?.map(_renderPill)}</View>;
};

export default CategoryPills;
