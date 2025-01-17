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
  value?: Category[];
  onChangeValue: (value: Category[]) => void;
};

/**
 * CategoryInput component allows users to select categories
 * by searching in a separate modal.
 */
const CategoryInput: React.FC<CategoryInputProps> = ({ value, onChangeValue }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const _closeModal = () => {
    setIsModalVisible(false);
  };

  const _onPressPill = useCallback(
    (id: number) => {
      // Remove category
      const copyValue: Category[] = [];
      value?.forEach((category) => {
        if (category.id === id) {
          return;
        }

        copyValue.push(category);
      });

      onChangeValue(copyValue);
    },
    [value, onChangeValue]
  );

  const _onSelectCategory = useCallback(
    (selectedCategory: Category) => {
      _closeModal();
      // Add category, if not already included
      const foundCategoryIndex = value?.findIndex(
        (category) => category.id === selectedCategory.id
      );
      if (foundCategoryIndex === undefined || foundCategoryIndex < 0) {
        const copyValue = [...(value || []), selectedCategory];
        onChangeValue(copyValue);
      }
    },
    [value, onChangeValue]
  );

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Label>Kategoriler</Label>

        {/* Add button */}
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

      {/* List of selected categories */}
      <CategoryPills
        categories={value}
        onPress={_onPressPill}
      />

      {/* Search modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <CategorySearch
              onSelectCategory={_onSelectCategory}
              onRequestClose={_closeModal}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CategoryInput;
