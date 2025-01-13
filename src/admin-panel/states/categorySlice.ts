import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoriesNormalized, Category } from '../types/category';
import { ServiceCallbacks } from '../../common/services/types';

type CategoryState = {
  categories?: CategoriesNormalized;
  loading: 'read' | 'add' | 'update' | 'delete' | null;
};

const initialState: CategoryState = {
  loading: null,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    // The first four are dispatched by UI and trigger listeners
    readCategories: (_state, _action: PayloadAction<ServiceCallbacks<Category[]>>) => {},
    addCategory: () => {},
    deleteCategory: (
      _state,
      _action: PayloadAction<{ id: Category['id'] } & ServiceCallbacks<void>>
    ) => {},
    updateCategory: () => {},

    // The next four are dispatched by listeners and update state
    _setCategories: (state, action: PayloadAction<CategoriesNormalized>) => {
      state.categories = action.payload;
    },
    _addCategory: () => {},
    _deleteCategory: (state, action: PayloadAction<number>) => {
      const categoryId = action.payload;
      if (state.categories?.[categoryId]) {
        delete state.categories[categoryId];
      }
    },
    _updateCategory: () => {},
    _setLoading: (state, action: PayloadAction<CategoryState['loading']>) => {
      state.loading = action.payload;
    },
  },
});
