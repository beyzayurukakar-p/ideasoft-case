import { StaticScreenProps, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { productDetailScreenStyles as styles } from './ProductDetailScreen.styles';
import { useAppDispatch, useAppSelector } from '../../common/store';
import { formatDateExtensive } from '../../common/utils/dateUtils';
import DetailActions from '../components/detail-actions/DetailActions';
import { useWarnedDelete } from '../hooks/useWarnedDelete';
import { productSelectors, productSlice } from '../states/productSlice';
import AppButton from '../../common/components/buttons/AppButton';
import TextField from '../components/detail-fields/TextField';
import Separator from '../components/detail-fields/Separator';
import StatusField from '../components/detail-fields/StatusField';
import { RootStackNavigationProp } from '../../common/navigation/rootNavigator';

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
          onSuccess: () => {
            nav.popTo('AdminPanel', {
              screen: 'Tabs',
              params: {
                screen: 'Product',
              },
            });
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

  if (!product) {
    return null;
  }

  const _renderCategories = () => {
    return (
      <View style={styles.categoriesContainer}>
        {product?.categories.map((category) => (
          <AppButton
            key={category.id}
            label={category.name}
            onPress={() => _onPressCategory(category.id)}
            appearance="outlined"
            style={styles.categoryButton}
          />
        ))}
      </View>
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
