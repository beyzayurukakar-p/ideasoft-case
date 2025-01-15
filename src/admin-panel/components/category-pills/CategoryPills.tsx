import React from 'react';
import { View } from 'react-native';
import { Category } from '../../types/category';
import AppButton from '../../../common/components/buttons/AppButton';
import { categoryPillsStyles as styles } from './CategoryPills.styles';

type CategoryPillsProps = {
  categories: Category[];
  onPress?: (id: number) => void;
};

const CategoryPills: React.FC<CategoryPillsProps> = ({ categories, onPress }) => {
  return (
    <View style={styles.categoriesContainer}>
      {categories.map((category) => (
        <AppButton
          key={category.id}
          label={category.name}
          onPress={() => onPress?.(category.id)}
          appearance="outlined"
          style={styles.categoryButton}
        />
      ))}
    </View>
  );
};

export default CategoryPills;
