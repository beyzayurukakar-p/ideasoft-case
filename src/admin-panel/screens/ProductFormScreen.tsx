import { StaticScreenProps } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { ScrollView, View, LayoutChangeEvent } from 'react-native';
import { useProductForm } from '../hooks/useProductForm';
import AppTextInput from '../../common/components/inputs/AppTextInput';
import FormActions from '../components/form-actions/FormActions';
import { formScreenStyles as styles } from './formScreen.styles';
import AppSwitch from '../../common/components/inputs/AppSwitch';
import Dropdown from '../../common/components/inputs/Dropdown';
import { stockTypeLabelOptions } from '../constants/stockTypeLabels';
import { currencyOptions } from '../constants/currencies';
import { dimensions } from '../../common/styling/dimensions';
import CategoryInput from '../components/category-input/CategoryInput';
import ImageInput from '../components/image-input/ImageInput';
import Separator from '../../common/components/separator/Separator';

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
    stockTypeLabel,
    onChangeStockTypeLabel,
    price,
    priceError,
    onChangePrice,
    currency,
    currencyError,
    onChangeCurrency,
    categories,
    onChangeCategories,
    images,
    onChangeImages,
    onPressAddUpdate,
    isLoading,
  } = useProductForm(productId);

  const scrollRef = useRef<ScrollView>(null);
  const [inputsOnBottom, setInputsOnButtom] = useState<string[]>([]);

  // A simple keyboard avoidance
  const _onLayout = (inputName: string, e: LayoutChangeEvent) => {
    // Save the names of the inputs that are on the bottom half of the screen
    const { y, height } = e.nativeEvent.layout;
    if (y + height > dimensions.height * 0.5) {
      setInputsOnButtom((inputs) => {
        return [...inputs, inputName];
      });
    }
  };
  const _onFocus = (inputName: string) => {
    // Scroll to end so that input isn't hidden behind keyboard
    if (inputsOnBottom.includes(inputName)) {
      scrollRef.current?.scrollToEnd();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <AppTextInput
          label="İsim"
          value={name}
          onChangeText={onChangeName}
          placeholder="Ürünün ismini yazın..."
          errorText={nameError}
          onLayout={(e) => _onLayout('name', e)}
          onFocus={() => _onFocus('name')}
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
          onLayout={(e) => _onLayout('stockCode', e)}
          onFocus={() => _onFocus('stockCode')}
        />
        <AppTextInput
          label="Stoktaki Miktar"
          value={stockAmount?.toString()}
          onChangeText={onChangeStockAmount}
          placeholder="Stoktaki ürün miktarını yazın..."
          errorText={stockAmountError}
          keyboardType="number-pad"
          onLayout={(e) => _onLayout('stockAmount', e)}
          onFocus={() => _onFocus('stockAmount')}
        />
        <Dropdown
          label="Stok Tipi"
          options={stockTypeLabelOptions}
          onValueChange={onChangeStockTypeLabel}
          selectedValue={stockTypeLabel}
          placeholder="Bir stok tipi seçin..."
        />
        <AppTextInput
          label="Fiyat"
          value={price?.toString()}
          onChangeText={onChangePrice}
          placeholder="Ürünün fiyatını yazın..."
          errorText={priceError}
          keyboardType="numeric"
          onLayout={(e) => _onLayout('price', e)}
          onFocus={() => _onFocus('price')}
        />
        <Dropdown
          label="Para Birimi"
          options={currencyOptions}
          onValueChange={onChangeCurrency}
          selectedValue={currency?.toString()}
          placeholder="Para birimini seçin..."
          errorText={currencyError}
        />
        <Separator />
        <CategoryInput
          value={categories}
          onChangeValue={onChangeCategories}
        />
        <Separator />
        <ImageInput
          value={images}
          onChangeValue={onChangeImages}
        />
      </ScrollView>
      <FormActions
        actionType={formType}
        onPressAction={onPressAddUpdate}
        isLoading={isLoading}
      />
    </View>
  );
};

export default ProductFormScreen;
