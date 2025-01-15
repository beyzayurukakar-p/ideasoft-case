import React, { useCallback, useState } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { Category } from '../../types/category';
import { categoryInputStyles as styles } from './CategoryInput.styles';
import Label from '../../../common/components/inputs/Label';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { dimensions } from '../../../common/styling/dimensions';
import { COLORS } from '../../../common/styling/colors';
import CategoryPills from '../category-pills/CategoryPills';
import CategorySearch from './CategorySearch';

type CategoryInputProps = {
  value: Category[];
  onChangeValue: (value: Category[]) => void;
};

const CategoryInput: React.FC<CategoryInputProps> = ({ value, onChangeValue }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const _onPressPill = (id: number) => {
    // Removes category
    const copyValue: Category[] = [];
    value.forEach((category) => {
      if (category.id === id) {
        return;
      }

      copyValue.push(category);
    });

    onChangeValue(copyValue);
  };

  const _onSelectCategory = useCallback(
    (selectedCategory: Category) => {
      setIsModalVisible(false);
      // Add category, if not already included
      const foundCategoryIndex = value.findIndex((category) => category.id === selectedCategory.id);
      if (foundCategoryIndex < 0) {
        const copyValue = [...value, selectedCategory];
        onChangeValue(copyValue);
      }
    },
    [value, onChangeValue]
  );

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Label>Kategoriler</Label>
        <TouchableOpacity
          style={styles.addTouchable}
          activeOpacity={0.5}
          onPress={() => setIsModalVisible(true)}
        >
          <MaterialCommunityIcons
            name={'plus'}
            size={dimensions.measure(30)}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
      <CategoryPills
        categories={value}
        onPress={_onPressPill}
      />
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableOpacity
          onPress={() => setIsModalVisible(false)}
          activeOpacity={1}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <CategorySearch onSelectCategory={_onSelectCategory} />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CategoryInput;
