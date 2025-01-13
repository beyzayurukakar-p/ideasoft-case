import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductsNormalized } from '../types/product';
import { ServiceCallbacks } from '../../common/services/types';
import { RootState } from '../../common/store/types';

type ProductState = {
  productsNormalized?: ProductsNormalized;
  loading: 'getProducts' | 'addProduct' | 'deleteProduct' | 'updateProduct' | null;
};

const initialState: ProductState = {
  loading: null,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // These four are dispatched by UI and listened by listeners
    getProducts: (_state, _action: PayloadAction<ServiceCallbacks<Product[]>>) => {},
    addProduct: () => {},
    deleteProduct: (
      _state,
      _action: PayloadAction<{ id: Product['id'] } & ServiceCallbacks<void>>
    ) => {},
    updateProduct: () => {},

    // These four are dispatched by listeners and update state
    _setProducts: (state, action: PayloadAction<ProductsNormalized>) => {
      state.productsNormalized = action.payload;
    },
    _addProduct: () => {},
    _deleteProduct: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      if (state.productsNormalized?.[productId]) {
        delete state.productsNormalized[productId];
      }
    },
    _updateProduct: () => {},
    _setLoading: (state, action: PayloadAction<ProductState['loading']>) => {
      state.loading = action.payload;
    },
  },
});

export const productSelectors = {
  // Memoized selector to get all products
  products: createSelector(
    (state: RootState) => state.product.productsNormalized,
    (productsNormalized) => {
      if (!productsNormalized) return undefined;
      // Sort products by createdAt date
      return Object.values(productsNormalized).sort((p1, p2) => {
        return new Date(p2.createdAt).getTime() - new Date(p1.createdAt).getTime();
      });
    }
  ),
  productById: (state: RootState, productId: number) => {
    return state.product.productsNormalized
      ? state.product.productsNormalized[productId]
      : undefined;
  },
  isLoadingGetProducts: (state: RootState) => state.product.loading === 'getProducts',
  isLoadingAddProduct: (state: RootState) => state.product.loading === 'addProduct',
  isLoadingDeleteProduct: (state: RootState) => state.product.loading === 'deleteProduct',
  isLoadingUpdateProduct: (state: RootState) => state.product.loading === 'updateProduct',
};
