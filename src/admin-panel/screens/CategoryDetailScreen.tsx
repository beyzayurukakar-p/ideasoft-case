import { StaticScreenProps, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { categoryDetailScreenStyles as styles } from './CategoryDetailScreen.styles';
import { useAppDispatch, useAppSelector } from '../../common/store';
import { categorySelectors, categorySlice } from '../states/categorySlice';
import { formatDateExtensive } from '../../common/utils/dateUtils';
import DetailActions from '../components/detail-actions/DetailActions';
import { useWarnedDelete } from '../hooks/useWarnedDelete';
import TouchableText from '../../common/components/buttons/TouchableText';
import TextField from '../components/detail-fields/TextField';
import Separator from '../../common/components/separator/Separator';
import StatusField from '../components/detail-fields/StatusField';
import { RootStackNavigationProp } from '../../common/navigation/rootNavigator';

type ScreenProps = StaticScreenProps<{
  categoryId: number;
}>;

/** Screen component to display all the fields of a category */
const CategoryDetailScreen: React.FC<ScreenProps> = ({
  route: {
    params: { categoryId },
  },
}) => {
  const category = useAppSelector((state) => categorySelectors.categoryById(state, categoryId));
  const isLoading = useAppSelector(categorySelectors.isLoadingDeleteCategory);

  const dispatch = useAppDispatch();
  const nav = useNavigation<RootStackNavigationProp>();

  const _onDelete = () => {
    dispatch(
      categorySlice.actions.deleteCategory({
        id: categoryId,
        onSuccess: () => {
          nav.popTo('AdminPanel', {
            screen: 'Tabs',
            params: {
              screen: 'Category',
            },
          });
        },
      })
    );
  };

  const _onPressEdit = () => {
    nav.navigate('AdminPanel', {
      screen: 'CategoryForm',
      params: {
        categoryId,
      },
    });
  };

  const { warnBeforeDelete, renderWarningModal } = useWarnedDelete(_onDelete);

  if (!category) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TextField
        label="İsim:"
        value={category.name}
        largeValue
      />
      <Separator />
      <StatusField
        label="Durum:"
        status={category.status}
      />
      <Separator />
      <TextField
        label="Oluşturma Tarihi:"
        value={formatDateExtensive(category.createdAt)}
      />
      <Separator />
      <TouchableText
        label="Kategorideki Ürünleri Gör"
        // TODO: Create a screen for products of the category
        onPress={() => {}}
        style={styles.seeProductTouchable}
      />
      <DetailActions
        onPressDelete={warnBeforeDelete}
        onPressEdit={_onPressEdit}
        isLoading={isLoading}
      />
      {renderWarningModal()}
    </View>
  );
};

export default CategoryDetailScreen;
