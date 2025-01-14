import { StaticScreenProps, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';
import { categoryDetailScreenStyles as styles } from './CategoryDetailScreen.styles';
import { useAppDispatch, useAppSelector } from '../../common/store';
import { categorySelectors, categorySlice } from '../states/categorySlice';
import { COLORS } from '../../common/styling/colors';
import { formatDateExtensive } from '../../common/utils/dateUtils';
import DetailActions from '../components/detail-actions/DetailActions';
import { useWarnedDelete } from '../hooks/useWarnedDelete';
import TouchableText from '../../common/components/buttons/TouchableText';

type ScreenProps = StaticScreenProps<{
  categoryId: number;
}>;

const CategoryDetailScreen: React.FC<ScreenProps> = ({
  route: {
    params: { categoryId },
  },
}) => {
  const category = useAppSelector((state) => categorySelectors.categoryById(state, categoryId));
  const isLoading = useAppSelector(categorySelectors.isLoadingDeleteCategory);
  const isActive = category?.status === 1;

  const dispatch = useAppDispatch();
  const nav = useNavigation();

  const _onDelete = () => {
    dispatch(
      categorySlice.actions.deleteCategory({
        id: categoryId,
        onSuccess: () => {
          nav.goBack();
        },
      })
    );
  };

  const _onPressEdit = () => {};

  const { warnBeforeDelete, renderWarningModal } = useWarnedDelete(_onDelete);

  if (!category) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.labelValueContainerVertical}>
        <Text style={styles.labelText}>{'İsim:'}</Text>
        <Text style={styles.valueTextLarge}>{category?.name}</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.labelValueContainerHorizontal}>
        <Text style={styles.labelText}>{'Durum:'}</Text>
        <View style={styles.statusContainer}>
          <Text
            style={[
              styles.valueText,
              {
                color: isActive ? COLORS.successTextOnBackground : COLORS.dangerTextOnBackground,
              },
            ]}
          >
            {isActive ? 'Aktif' : 'İnaktif'}
          </Text>
          <View
            style={[
              styles.statusCircle,
              {
                backgroundColor: isActive ? COLORS.success : COLORS.danger,
              },
            ]}
          />
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.labelValueContainerVertical}>
        <Text style={styles.labelText}>{'Oluşturma Tarihi:'}</Text>
        <Text style={styles.valueText}>{formatDateExtensive(category?.createdAt as string)}</Text>
      </View>
      <View style={styles.separator} />
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
