import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Category } from '../../types/category';
import { useDispatch } from 'react-redux';
import { categorySlice } from '../../states/categorySlice';
import { categoryItemStyles as styles } from './CategoryItem.styles';
import SwipeableWithDelete from '../../../common/components/swipeable/SwipeableWithDelete';
import { COLORS } from '../../../common/styling/colors';

type CategoryItemProps = {
  category: Category;
  demonstrateSwipeOnStart: boolean;
};

const CategoryItem: React.FC<CategoryItemProps> = ({ category, demonstrateSwipeOnStart }) => {
  const { id, name, status } = category;

  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState<boolean>(false);

  const _onPressDelete = () => {
    setDisabled(true);
    dispatch(
      categorySlice.actions.deleteCategory({
        id,
        onError: () => {
          setDisabled(false);
        },
      })
    );
  };

  return (
    <View style={disabled ? styles.disabledContainer : null}>
      <SwipeableWithDelete
        demonstrateOnStart={demonstrateSwipeOnStart}
        disabled={disabled}
        onPressDelete={_onPressDelete}
      >
        <TouchableOpacity
          style={styles.container}
          activeOpacity={0.6}
          disabled={disabled}
        >
          {/* name */}
          <Text
            style={styles.primaryText}
            numberOfLines={1}
          >
            {name}
          </Text>

          {/* status as a red/green circle */}
          <View
            style={[
              styles.statusCircle,
              {
                backgroundColor: status === 0 ? COLORS.danger : COLORS.success,
              },
            ]}
          />
        </TouchableOpacity>
      </SwipeableWithDelete>
    </View>
  );
};

export default CategoryItem;
