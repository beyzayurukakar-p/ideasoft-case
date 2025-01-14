import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CategoriesNormalized,
  Category,
  CategoryAddPayload,
  CategoryUpdatePayload,
} from '../types/category';
import { ServiceCallbacks } from '../../common/services/types';
import { RootState } from '../../common/store/types';

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
    addCategory: (
      _state,
      _action: PayloadAction<ServiceCallbacks<Category> & { category: CategoryAddPayload }>
    ) => {},
    deleteCategory: (
      _state,
      _action: PayloadAction<{ id: Category['id'] } & ServiceCallbacks<void>>
    ) => {},
    updateCategory: (
      _state,
      _action: PayloadAction<ServiceCallbacks<Category> & { category: CategoryUpdatePayload }>
    ) => {},

    // The next four are dispatched by listeners and update state
    _setCategories: (state, action: PayloadAction<CategoriesNormalized>) => {
      state.categories = action.payload;
    },
    _addCategory: (state, action: PayloadAction<Category>) => {
      const category = action.payload;
      if (state.categories) {
        state.categories[category.id] = category;
      }
    },
    _deleteCategory: (state, action: PayloadAction<number>) => {
      const categoryId = action.payload;
      if (state.categories?.[categoryId]) {
        delete state.categories[categoryId];
      }
    },
    _updateCategory: (state, action: PayloadAction<Category>) => {
      const category = action.payload;
      if (state.categories && state.categories[category.id]) {
        Object.assign(state.categories[category.id], category);
      }
    },
    _setLoading: (state, action: PayloadAction<CategoryState['loading']>) => {
      state.loading = action.payload;
    },
  },
});

export const categorySelectors = {
  // Memoized selector to get all categories
  categories: createSelector(
    (state: RootState) => state.category.categories,
    (categories) => {
      if (!categories) return undefined;
      // Sort categories by createdAt date
      return Object.values(categories).sort((p1, p2) => {
        return new Date(p2.createdAt).getTime() - new Date(p1.createdAt).getTime();
      });
    }
  ),
  categoryById: (state: RootState, categoryId: number) => {
    return state.category.categories ? state.category.categories[categoryId] : undefined;
  },
  isLoadingReadCategories: (state: RootState) => state.category.loading === 'read',
  isLoadingAddCategory: (state: RootState) => state.category.loading === 'add',
  isLoadingDeleteCategory: (state: RootState) => state.category.loading === 'delete',
  isLoadingUpdateCategory: (state: RootState) => state.category.loading === 'update',
};
