import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../common/store';
import { productSelectors, productSlice } from '../states/productSlice';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../common/navigation/rootNavigator';

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
  // Error states
  const [nameError, setNameError] = useState<string | null>(null);
  const [stockCodeError, setStockCodeError] = useState<string | null>(null);
  const [stockAmountError, setStockAmountError] = useState<string | null>(null);
  const [stockTypeLabelError, setStockTypeLabelError] = useState<string | null>(null);

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
    if (!stockTypeLabel) {
      setStockTypeLabelError('Bu alan zorunludur.');
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
    if (Number.isInteger(Number(amount))) {
      setStockAmount(Number(amount));
      setStockAmountError(null);
    }
  };

  const _goBackToList = () => {
    // Goes back to category list
    nav.popTo('AdminPanel', {
      screen: 'Tabs',
      params: {
        screen: 'Product',
      },
    });
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
            price: 100,
            currencyId: 1,
            stockAmount: stockAmount as number,
          },
          onSuccess: _goBackToList,
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
            price: 100,
            currencyId: 1,
            stockAmount: stockAmount as number,
            id: productId as number,
          },
          onSuccess: _goBackToList,
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
    stockTypeLabelError,
    onChangeStockTypeLabel: setStockTypeLabel,

    isLoading,
    onPressAddUpdate: _onPressAddUpdate,
  };
};
