import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Category } from '../../types/category';
import { categorySlice } from '../../states/categorySlice';
import { categoryItemStyles as styles } from './CategoryItem.styles';
import SwipeableWithDelete from '../../../common/components/swipeable/SwipeableWithDelete';
import { COLORS } from '../../../common/styling/colors';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../../common/store';

type CategoryItemProps = {
  category: Category;

  /** Whether to demonstrate swipeability on mount. */
  demonstrateSwipeOnStart: boolean;

  /** A function to warn before deleting the category. */
  warnBeforeDelete: (onDelete: () => void) => void;
};

/**
 * A component that displays a category item with swipe-to-delete functionality.
 * It shows the category name and status, and allows navigation to the category detail screen.
 */
const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  demonstrateSwipeOnStart,
  warnBeforeDelete,
}) => {
  const { id, name, status } = category;

  const dispatch = useAppDispatch();
  const nav = useNavigation();
  const [disabled, setDisabled] = useState<boolean>(false);

  const _onPressDelete = () => {
    warnBeforeDelete(() => {
      setDisabled(true);
      dispatch(
        categorySlice.actions.deleteCategory({
          id,
          onError: () => {
            setDisabled(false);
          },
        })
      );
    });
  };

  const _onPressItem = () => {
    nav.navigate('AdminPanel', {
      screen: 'CategoryDetail',
      params: {
        categoryId: id,
      },
    });
  };

  return (
    <View style={disabled ? styles.disabledContainer : null}>
      <SwipeableWithDelete
        demonstrateOnStart={demonstrateSwipeOnStart}
        disabled={disabled}
        onPressDelete={_onPressDelete}
        testID={`delete-category-${id}`}
      >
        <TouchableOpacity
          onPress={_onPressItem}
          style={styles.container}
          activeOpacity={0.6}
          disabled={disabled}
          testID={`category-item-${id}`}
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
