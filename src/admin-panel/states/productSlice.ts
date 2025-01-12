import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/product';

type ProductState = {
  products?: Product[];
};

const initialState: ProductState = {};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // The first four are dispatched by UI and trigger listeners
    getProducts: () => {},
    addProduct: () => {},
    deleteProduct: () => {},
    updateProduct: () => {},

    // The next four are dispatched by listeners and update state
    _setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    _addProduct: () => {},
    _deleteProduct: () => {},
    _updateProduct: () => {},
  },
});
