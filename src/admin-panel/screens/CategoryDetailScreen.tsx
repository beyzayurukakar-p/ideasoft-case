import { StaticScreenProps } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';
import { categoryDetailScreenStyles as styles } from './CategoryDetailScreen.styles';
import { useAppSelector } from '../../common/store';
import { categorySelectors } from '../states/categorySlice';
import { COLORS } from '../../common/styling/colors';
import { formatDateExtensive } from '../../common/utils/dateUtils';
import DetailActions from '../components/detail-actions/DetailActions';

type ScreenProps = StaticScreenProps<{
  categoryId: number;
}>;

const CategoryDetailScreen: React.FC<ScreenProps> = ({
  route: {
    params: { categoryId },
  },
}) => {
  const category = useAppSelector((state) => categorySelectors.categoryById(state, categoryId));
  const isActive = category?.status === 1;

  const _onPressDelete = () => {};

  const _onPressEdit = () => {};

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
              styles.statusText,
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
      <DetailActions
        onPressDelete={_onPressDelete}
        onPressEdit={_onPressEdit}
      />
    </View>
  );
};

export default CategoryDetailScreen;
