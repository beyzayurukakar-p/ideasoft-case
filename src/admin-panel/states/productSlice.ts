import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, CategoryProducts, ProductsNormalized } from '../types/product';
import { ServiceCallbacks } from '../../common/services/types';
import { RootState } from '../../common/store/types';

type ProductState = {
  products?: ProductsNormalized;
  categoryProducts?: CategoryProducts;
  loading: 'read' | 'add' | 'update' | 'delete' | null;
};

const initialState: ProductState = {
  loading: null,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // These four are dispatched by UI and listened by listeners
    readProducts: (_state, _action: PayloadAction<ServiceCallbacks<Product[]>>) => {},
    addProduct: () => {},
    deleteProduct: (
      _state,
      _action: PayloadAction<{ id: Product['id'] } & ServiceCallbacks<void>>
    ) => {},
    updateProduct: () => {},

    // These four are dispatched by listeners and update state
    _setProducts: (
      state,
      action: PayloadAction<{
        products: ProductsNormalized;
        categoryProducts: CategoryProducts;
      }>
    ) => {
      state.products = action.payload.products;
      state.categoryProducts = action.payload.categoryProducts;
    },
    _addProduct: () => {},
    _deleteProduct: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      if (state.products?.[productId]) {
        delete state.products[productId];
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
    (state: RootState) => state.product.products,
    (products) => {
      if (!products) return undefined;
      // Sort products by createdAt date
      return Object.values(products).sort((p1, p2) => {
        return new Date(p2.createdAt).getTime() - new Date(p1.createdAt).getTime();
      });
    }
  ),
  productById: (state: RootState, productId: number) => {
    return state.product.products ? state.product.products[productId] : undefined;
  },
  isLoadingGetProducts: (state: RootState) => state.product.loading === 'read',
  isLoadingAddProduct: (state: RootState) => state.product.loading === 'add',
  isLoadingDeleteProduct: (state: RootState) => state.product.loading === 'delete',
  isLoadingUpdateProduct: (state: RootState) => state.product.loading === 'update',
};
