import { createSlice } from '@reduxjs/toolkit';
type CategoryState = {};

const initialState: CategoryState = {};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    // The first four are dispatched by UI and trigger listeners
    getCategories: () => {},
    addCategory: () => {},
    deleteCategory: () => {},
    updateCategory: () => {},

    // The next four are dispatched by listeners and update state
    _setCategories: () => {},
    _addCategory: () => {},
    _deleteCategory: () => {},
    _updateCategory: () => {},
  },
});
