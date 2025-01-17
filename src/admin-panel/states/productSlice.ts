import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Product,
  CategoryProducts,
  ProductsNormalized,
  ProductAddPayload,
  ProductUpdatePayload,
} from '../types/product';
import { ServiceCallbacks } from '../../common/services/types';
import { RootState } from '../../common/store/types';

type ProductState = {
  productIds: number[];
  recentlyAddedIds: number[];
  productsNormalized: ProductsNormalized;
  categoryProducts: CategoryProducts;
  currentPage?: number;
  isLastPage: boolean;
  loading: 'read' | 'refresh' | 'add' | 'update' | 'delete' | null;
};

const initialState: ProductState = {
  productIds: [],
  recentlyAddedIds: [],
  productsNormalized: {},
  categoryProducts: {},
  isLastPage: false,
  loading: null,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // These four are dispatched by UI and listened by listeners
    readProducts: (_state, _action: PayloadAction<ServiceCallbacks<Product[]>>) => {},
    refresh: (_state, _action: PayloadAction<ServiceCallbacks<Product[]>>) => {},
    readNextPage: (_state, _action: PayloadAction<ServiceCallbacks<Product[]>>) => {},
    addProduct: (
      _state,
      _action: PayloadAction<ServiceCallbacks<Product> & { product: ProductAddPayload }>
    ) => {},
    deleteProduct: (
      _state,
      _action: PayloadAction<{ id: Product['id'] } & ServiceCallbacks<void>>
    ) => {},
    updateProduct: (
      _state,
      _action: PayloadAction<ServiceCallbacks<Product> & { product: ProductUpdatePayload }>
    ) => {},

    // These four are dispatched by listeners and update state
    _setProducts: (
      state,
      action: PayloadAction<{
        products: Product[];
        page: number;
      }>
    ) => {
      const { products, page } = action.payload;
      // Normalize products
      const productsNormalized: ProductsNormalized = {};
      const productIdList: number[] = [];
      const categoryProducts: CategoryProducts = {};

      products.forEach((product) => {
        productsNormalized[product.id] = product;
        productIdList.push(product.id);
        product.categories.map((category) => {
          if (!categoryProducts[category.id]) {
            categoryProducts[category.id] = [];
          }
          categoryProducts[category.id].push(product.id);
        });
      });

      state.productsNormalized = productsNormalized;
      state.productIds = productIdList;
      state.categoryProducts = categoryProducts;
      state.currentPage = page;
      state.recentlyAddedIds.length = 0; // Empty recently added list
    },
    _addNextPage: (
      state,
      action: PayloadAction<{
        products: Product[];
        page: number;
      }>
    ) => {
      const { products, page } = action.payload;

      const productsNormalized: ProductsNormalized = {};
      const productIdList: number[] = [];
      const categoryProducts: CategoryProducts = {};

      products.forEach((product) => {
        productsNormalized[product.id] = product;
        productIdList.push(product.id);
        product.categories.map((category) => {
          if (!categoryProducts[category.id]) {
            categoryProducts[category.id] = [];
          }
          categoryProducts[category.id].push(product.id);
        });
      });

      Object.assign(state.productsNormalized, productsNormalized);
      Object.assign(state.categoryProducts, categoryProducts);
      state.productIds.push(...productIdList);
      state.currentPage = page;
      state.recentlyAddedIds.length = 0;
    },
    _addProduct: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      state.productsNormalized[product.id] = product;
      state.recentlyAddedIds.push(product.id);
    },
    _deleteProduct: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      if (state.productsNormalized[productId]) {
        state.productsNormalized[productId].deleted = true;
      }
    },
    _updateProduct: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      if (state.productsNormalized[product.id]) {
        Object.assign(state.productsNormalized[product.id], product);
      }
    },
    _setLoading: (state, action: PayloadAction<ProductState['loading']>) => {
      state.loading = action.payload;
    },
    _setIsLastPage: (state, action: PayloadAction<boolean>) => {
      state.isLastPage = action.payload;
    },
    _categoryRemoved: (state, action: PayloadAction<number>) => {
      // When a category is removed, also remove it from its products
      const categoryId = action.payload;
      if (state.categoryProducts?.[categoryId]) {
        const productsInCateogry = state.categoryProducts[categoryId];
        delete state.categoryProducts[categoryId];
        productsInCateogry.map((productId) => {
          const categoryIndex = state.productsNormalized?.[productId].categories.findIndex(
            (category) => category.id === categoryId
          ) as number;
          state.productsNormalized?.[productId].categories.splice(categoryIndex, 1);
        });
      }
    },
  },
});

export const productSelectors = {
  /** Memoized selector to get all products */
  products: createSelector(
    (state: RootState) => state.product.productIds,
    (state: RootState) => state.product.productsNormalized,
    (idList, normalized) => {
      const products: Product[] = [];
      idList.forEach((productId) => {
        const product = normalized[productId];
        if (!product.deleted) {
          products.push(product);
        }
      });

      return products;
    }
  ),
  /** Memoized selector to get recently added categories */
  recentlyAddedProducts: createSelector(
    (state: RootState) => state.product.recentlyAddedIds,
    (state: RootState) => state.product.productsNormalized,
    (idList, normalized) => {
      const products: Product[] = [];
      idList.forEach((productId) => {
        const product = normalized[productId];
        if (!product.deleted) {
          products.push(product);
        }
      });

      return products;
    }
  ),
  productById: (state: RootState, productId: number) => {
    return state.product.productsNormalized[productId];
  },
  productsOfCategory: (state: RootState, categoryId: number) => {
    return state.product.categoryProducts[categoryId];
  },
  isLastPage: (state: RootState) => state.product.isLastPage,
  isRefreshing: (state: RootState) => state.product.loading === 'refresh',
  isLoadingReadProducts: (state: RootState) => state.product.loading === 'read',
  isLoadingAddProduct: (state: RootState) => state.product.loading === 'add',
  isLoadingDeleteProduct: (state: RootState) => state.product.loading === 'delete',
  isLoadingUpdateProduct: (state: RootState) => state.product.loading === 'update',
};
