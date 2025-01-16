import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../common/store';
import { productSelectors, productSlice } from '../states/productSlice';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../common/navigation/rootNavigator';
import { Category } from '../types/category';
import { StockTypeLabels } from '../constants/stockTypeLabels';
import { InputImage } from '../components/image-input/types';

export const useProductForm = (productId?: number) => {
  const dispatch = useAppDispatch();
  const nav = useNavigation<RootStackNavigationProp>();

  // Values selected from redux state
  const isAddLoading = useAppSelector(productSelectors.isLoadingAddProduct);
  const isUpdateLoading = useAppSelector(productSelectors.isLoadingUpdateProduct);
  const product = useAppSelector((state) =>
    productId ? productSelectors.productById(state, productId) : undefined
  );

  // Field states
  const [name, setName] = useState<string | undefined>(product?.name || undefined);
  const [stockCode, setStockCode] = useState<string | undefined>(product?.sku || undefined);
  const [status, setStatus] = useState<boolean>(
    product?.status !== undefined ? product?.status === 1 : true
  );
  const [stockAmount, setStockAmount] = useState<number | undefined>(
    product?.stockAmount || undefined
  );
  const [stockTypeLabel, setStockTypeLabel] = useState<string | undefined>(
    product?.stockTypeLabel || undefined
  );
  const [price, setPrice] = useState<number | undefined>(product?.price || undefined);
  const [currency, setCurrency] = useState<number | string | undefined>(
    product?.currencyId || undefined
  );
  const [categories, setCategories] = useState<Category[] | undefined>(
    product?.categories || undefined
  );
  const [images, setImages] = useState<InputImage[] | undefined>(product?.images || undefined);
  // Error states
  const [nameError, setNameError] = useState<string | null>(null);
  const [stockCodeError, setStockCodeError] = useState<string | null>(null);
  const [stockAmountError, setStockAmountError] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [currencyError, setCurrencyError] = useState<string | null>(null);

  // Derived values
  const formType: 'update' | 'add' = productId ? 'update' : 'add';
  const isLoading = formType === 'add' ? isAddLoading : isUpdateLoading;

  // Set screen title
  useEffect(() => {
    nav.setOptions({
      title: formType === 'add' ? 'Yeni Ürün' : 'Ürünü Düzenle',
    });
  }, [nav, formType]);

  // Form validation
  const _validate = (callback: () => void) => {
    let validated = true;
    if (!name || name.trim().length === 0) {
      setNameError('Bu alan zorunludur.');
      validated = false;
    }
    if (!stockCode || stockCode.trim().length === 0) {
      setStockCodeError('Bu alan zorunludur.');
      validated = false;
    }
    if (!stockAmount || stockAmount < 0) {
      setStockAmountError('Bu alan zorunludur.');
      validated = false;
    }
    if (!price || price < 0) {
      setPriceError('Bu alan zorunludur.');
      validated = false;
    }
    if (!currency) {
      setCurrencyError('Bu alan zorunludur.');
      validated = false;
    }
    if (validated) {
      callback();
    }
  };

  // Change handlers
  const _onChangeName = (text: string) => {
    setName(text);
    setNameError(null);
  };
  const _onChangeStockCode = (text: string) => {
    setStockCode(text);
    setStockCodeError(null);
  };
  const _onChangeStockAmount = (amount: string) => {
    setStockAmountError(null);
    if (amount.trim().length === 0) {
      setStockAmount(undefined);
    } else if (Number.isInteger(Number(amount))) {
      setStockAmount(Number(amount));
    }
  };
  const _onChangePrice = (value: string) => {
    setPriceError(null);
    if (value.trim().length === 0) {
      setPrice(undefined);
    } else if (Number.isInteger(Number(value))) {
      setPrice(Number(value));
    }
  };
  const _onChangeCurrency = (value: string | number) => {
    setCurrency(value);
    setCurrencyError(null);
  };

  // Add action
  const _add = () => {
    _validate(() => {
      dispatch(
        productSlice.actions.addProduct({
          product: {
            name: (name as string).trim(),
            sku: (stockCode as string).trim(),
            status: status ? 1 : 0,
            price: price as number,
            currencyId: currency as number,
            stockAmount: stockAmount as number,
            categories,
            images,
          },
          onSuccess: nav.goBack,
        })
      );
    });
  };

  // Update action
  const _update = () => {
    _validate(() => {
      dispatch(
        productSlice.actions.updateProduct({
          product: {
            name: (name as string).trim(),
            sku: (stockCode as string).trim(),
            status: status ? 1 : 0,
            price: price as number,
            currencyId: currency as number,
            stockAmount: stockAmount as number,
            id: productId as number,
            categories,
            images,
            stockTypeLabel: stockTypeLabel as StockTypeLabels,
          },
          onSuccess: nav.goBack,
        })
      );
    });
  };

  const _onPressAddUpdate = () => {
    formType === 'add' ? _add() : _update();
  };

  return {
    formType,

    name,
    nameError,
    onChangeName: _onChangeName,

    stockCode,
    stockCodeError,
    onChangeStockCode: _onChangeStockCode,

    stockAmount,
    stockAmountError,
    onChangeStockAmount: _onChangeStockAmount,

    status,
    onChangeStatus: setStatus,

    stockTypeLabel,
    onChangeStockTypeLabel: setStockTypeLabel,

    price,
    priceError,
    onChangePrice: _onChangePrice,

    currency,
    currencyError,
    onChangeCurrency: _onChangeCurrency,

    categories,
    onChangeCategories: setCategories,

    images,
    onChangeImages: setImages,

    isLoading,
    onPressAddUpdate: _onPressAddUpdate,
  };
};
