import { StaticScreenProps, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { productDetailScreenStyles as styles } from './ProductDetailScreen.styles';
import { useAppDispatch, useAppSelector } from '../../common/store';
import { formatDateExtensive } from '../../common/utils/dateUtils';
import DetailActions from '../components/detail-actions/DetailActions';
import { useWarnedDelete } from '../hooks/useWarnedDelete';
import { productSelectors, productSlice } from '../states/productSlice';
import TextField from '../components/detail-fields/TextField';
import Separator from '../../common/components/separator/Separator';
import StatusField from '../components/detail-fields/StatusField';
import { RootStackNavigationProp } from '../../common/navigation/rootNavigator';
import CategoryPills from '../components/category-pills/CategoryPills';

type ScreenProps = StaticScreenProps<{
  productId: number;
}>;

/** Screen component to display all the fields of a product */
const ProductDetailScreen: React.FC<ScreenProps> = ({
  route: {
    params: { productId },
  },
}) => {
  const product = useAppSelector((state) => productSelectors.productById(state, productId));
  const isLoading = useAppSelector(productSelectors.isLoadingDeleteProduct);

  const dispatch = useAppDispatch();
  const nav = useNavigation<RootStackNavigationProp>();

  const hasCategories = product?.categories !== undefined && product.categories.length > 0;

  const { warnBeforeDelete, renderWarningModal } = useWarnedDelete();

  const _onPressDelete = () => {
    warnBeforeDelete(() => {
      dispatch(
        productSlice.actions.deleteProduct({
          id: productId,
          onSuccess: nav.popToTop,
        })
      );
    });
  };

  const _onPressEdit = () => {
    nav.navigate('AdminPanel', {
      screen: 'ProductForm',
      params: {
        productId,
      },
    });
  };

  const _onPressCategory = (categoryId: number) => {
    nav.navigate('AdminPanel', {
      screen: 'CategoryDetail',
      params: {
        categoryId,
      },
    });
  };

  if (!product) {
    return null;
  }

  const _renderCategories = () => {
    return (
      <CategoryPills
        categories={product?.categories}
        onPress={_onPressCategory}
      />
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <TextField
          label="İsim:"
          value={product.name}
          largeValue
        />
        <Separator />
        <StatusField
          label="Durum:"
          status={product.status}
        />
        <Separator />
        <Text>TODO: Görseller</Text>
        <Separator />
        <TextField
          label="Tam isim:"
          value={product.fullName}
        />
        <Separator />
        <TextField
          label="Stok kodu:"
          value={product.sku}
        />
        <Separator />
        <TextField
          label="Stok miktarı:"
          value={`${product.stockAmount} (${product.stockTypeLabel})`}
        />
        <Separator />
        <TextField
          label="Fiyat:"
          value={`${product.price} (${product.currencyAbbr})`}
        />
        <Separator />
        <TextField
          label="Oluşturma Tarihi:"
          value={formatDateExtensive(product.createdAt)}
        />
        <Separator />
        <TextField
          label="Kategoriler:"
          value={hasCategories ? undefined : 'Kategori bulunmuyor.'}
          renderValue={hasCategories ? _renderCategories : undefined}
        />
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
