import { StaticScreenProps, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { productDetailScreenStyles as styles } from './ProductDetailScreen.styles';
import { useAppDispatch, useAppSelector } from '../../common/store';
import { COLORS } from '../../common/styling/colors';
import { formatDateExtensive } from '../../common/utils/dateUtils';
import DetailActions from '../components/detail-actions/DetailActions';
import { useWarnedDelete } from '../hooks/useWarnedDelete';
import { productSelectors, productSlice } from '../states/productSlice';
import AppButton from '../../common/components/buttons/AppButton';
import { Category } from '../types/category';

type ScreenProps = StaticScreenProps<{
  productId: number;
}>;

const ProductDetailScreen: React.FC<ScreenProps> = ({
  route: {
    params: { productId },
  },
}) => {
  const product = useAppSelector((state) => productSelectors.productById(state, productId));
  const isLoading = useAppSelector(productSelectors.isLoadingDeleteProduct);
  const isActive = product?.status === 1;

  const dispatch = useAppDispatch();
  const nav = useNavigation();

  const { warnBeforeDelete, renderWarningModal } = useWarnedDelete();

  const _onPressDelete = () => {
    warnBeforeDelete(() => {
      dispatch(
        productSlice.actions.deleteProduct({
          id: productId,
          onSuccess: () => {
            nav.goBack();
          },
        })
      );
    });
  };

  const _onPressEdit = () => {};

  const _onPressCategory = (categoryId: number) => {
    nav.navigate('AdminPanel', {
      screen: 'CategoryDetail',
      params: {
        categoryId,
      },
    });
  };

  const _renderCategory = (category: Category) => {
    return (
      <AppButton
        label={category.name}
        onPress={() => _onPressCategory(category.id)}
        appearance="outlined"
        style={styles.categoryButton}
      />
    );
  };

  if (!product) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.labelValueContainerVertical}>
          <Text style={styles.labelText}>{'İsim:'}</Text>
          <Text style={styles.valueTextLarge}>{product?.name}</Text>
        </View>
        <View style={styles.separator} />
        <Text>TODO: Görseller</Text>
        <View style={styles.separator} />
        <View style={styles.labelValueContainerVertical}>
          <Text style={styles.labelText}>{'Tam isim:'}</Text>
          <Text style={styles.valueText}>{product?.fullName}</Text>
        </View>
        <View style={styles.labelValueContainerVertical}>
          <Text style={styles.labelText}>{'Tam isim:'}</Text>
          <Text style={styles.valueText}>{product?.fullName}</Text>
        </View>
        <View style={styles.labelValueContainerVertical}>
          <Text style={styles.labelText}>{'Tam isim:'}</Text>
          <Text style={styles.valueText}>{product?.fullName}</Text>
        </View>
        <View style={styles.labelValueContainerVertical}>
          <Text style={styles.labelText}>{'Tam isim:'}</Text>
          <Text style={styles.valueText}>{product?.fullName}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.labelValueContainerVertical}>
          <Text style={styles.labelText}>{'Stok kodu:'}</Text>
          <Text style={styles.valueText}>{product?.sku}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.labelValueContainerVertical}>
          <Text style={styles.labelText}>{'Stok miktarı:'}</Text>
          <Text
            style={styles.valueText}
          >{`${product?.stockAmount} (${product?.stockTypeLabel})`}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.labelValueContainerVertical}>
          <Text style={styles.labelText}>{'Fiyat:'}</Text>
          <Text style={styles.valueText}>{`${product?.price} (${product?.currencyAbbr})`}</Text>
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
          <Text style={styles.valueText}>{formatDateExtensive(product?.createdAt as string)}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.labelValueContainerVertical}>
          <Text style={styles.labelText}>{'Kategoriler:'}</Text>
          <View style={styles.categoriesContainer}>{product?.categories.map(_renderCategory)}</View>
        </View>
      </ScrollView>
      <DetailActions
        onPressDelete={_onPressDelete}
        onPressEdit={_onPressEdit}
        isLoading={isLoading}
      />
      {renderWarningModal()}
    </View>
  );
};

export default ProductDetailScreen;
