import { StaticScreenProps } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { useProductForm } from '../hooks/useProductForm';
import AppTextInput from '../../common/components/inputs/AppTextInput';
import FormActions from '../components/form-actions/FormActions';
import { formScreenStyles as styles } from './formScreen.styles';
import AppSwitch from '../../common/components/inputs/AppSwitch';

type ScreenProps = StaticScreenProps<{
  productId?: number;
}>;

const ProductFormScreen: React.FC<ScreenProps> = ({
  route: {
    params: { productId },
  },
}) => {
  const {
    formType,
    name,
    nameError,
    onChangeName,
    stockCode,
    stockCodeError,
    onChangeStockCode,
    stockAmount,
    stockAmountError,
    onChangeStockAmount,
    status,
    onChangeStatus,
    onPressAddUpdate,
    isLoading,
  } = useProductForm(productId);
  return (
    <View style={styles.container}>
      <AppTextInput
        label="İsim"
        value={name}
        onChangeText={onChangeName}
        placeholder="Ürünün ismini yazın..."
        errorText={nameError}
      />
      <AppSwitch
        label="Durum"
        value={status}
        onValueChange={onChangeStatus}
      />
      <AppTextInput
        label="Stok kodu"
        value={stockCode}
        onChangeText={onChangeStockCode}
        placeholder="Ürünün stok kodunu yazın..."
        errorText={stockCodeError}
      />
      <AppTextInput
        label="Stoktaki Miktar"
        value={stockAmount?.toString()}
        onChangeText={onChangeStockAmount}
        placeholder="Stoktaki ürün miktarını yazın..."
        errorText={stockAmountError}
        keyboardType="number-pad"
      />
      <FormActions
        actionType={formType}
        onPressAction={onPressAddUpdate}
        isLoading={isLoading}
      />
    </View>
  );
};

export default ProductFormScreen;
