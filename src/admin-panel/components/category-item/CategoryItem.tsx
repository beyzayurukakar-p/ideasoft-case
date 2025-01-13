import React from 'react';
import { View, Text } from 'react-native';
import { Category } from '../../types/category';

type CategoryItemProps = {
  category: Category;
};

const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
  return (
    <View>
      <Text>{category.name}</Text>
      <Text>ID: {category.id}</Text>
    </View>
  );
};

export default CategoryItem;
