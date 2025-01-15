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
  categoryIds: number[];
  recentlyAddedIds: number[];
  categoriesNormalized: CategoriesNormalized;
  currentPage?: number;
  isLastPage: boolean;
  loading: 'read' | 'refresh' | 'add' | 'update' | 'delete' | null;
};

const initialState: CategoryState = {
  categoryIds: [],
  recentlyAddedIds: [],
  categoriesNormalized: {},
  isLastPage: false,
  loading: null,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    // The first four are dispatched by UI and trigger listeners
    readCategories: (_state, _action: PayloadAction<ServiceCallbacks<Category[]>>) => {},
    refresh: (_state, _action: PayloadAction<ServiceCallbacks<Category[]>>) => {},
    readNextPage: (_state, _action: PayloadAction<ServiceCallbacks<Category[]>>) => {},
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
    _setCategories: (
      state,
      action: PayloadAction<{
        categories: Category[];
        page: number;
      }>
    ) => {
      const { categories, page } = action.payload;
      // Normalize categories to an object with id as key and value as category
      const categoriesNormalized: CategoriesNormalized = {};
      const categoryIdList: number[] = [];
      categories.forEach((category) => {
        categoriesNormalized[category.id] = category;
        categoryIdList.push(category.id);
      });
      state.categoriesNormalized = categoriesNormalized;
      state.categoryIds = categoryIdList;
      state.currentPage = page;
      state.recentlyAddedIds.length = 0;
    },
    _addNextPage: (
      state,
      action: PayloadAction<{
        categories: Category[];
        page: number;
      }>
    ) => {
      const { categories, page } = action.payload;
      // Normalize categories to an object with id as key and value as category
      const categoriesNormalized: CategoriesNormalized = {};
      const categoryIdList: number[] = [];
      categories.forEach((category) => {
        categoriesNormalized[category.id] = category;
        categoryIdList.push(category.id);
      });
      Object.assign(state.categoriesNormalized, categoriesNormalized);
      state.categoryIds.push(...categoryIdList);
      state.currentPage = page;
      state.recentlyAddedIds.length = 0;
    },
    _addCategory: (state, action: PayloadAction<Category>) => {
      const category = action.payload;
      state.categoriesNormalized[category.id] = category;
      state.recentlyAddedIds.push(category.id);
    },
    _deleteCategory: (state, action: PayloadAction<number>) => {
      const categoryId = action.payload;
      if (state.categoriesNormalized[categoryId]) {
        delete state.categoriesNormalized[categoryId];
      }
      const indexOfId = state.categoryIds.indexOf(categoryId);
      if (indexOfId > -1) {
        state.categoryIds.splice(indexOfId, 1);
      }
      const indexOfIdInRecents = state.recentlyAddedIds.indexOf(categoryId);
      if (indexOfIdInRecents > -1) {
        state.recentlyAddedIds.splice(indexOfIdInRecents, 1);
      }
    },
    _updateCategory: (state, action: PayloadAction<Category>) => {
      const category = action.payload;
      if (state.categoriesNormalized[category.id]) {
        Object.assign(state.categoriesNormalized[category.id], category);
      }
    },
    _setLoading: (state, action: PayloadAction<CategoryState['loading']>) => {
      state.loading = action.payload;
    },
    _setIsLastPage: (state, action: PayloadAction<boolean>) => {
      state.isLastPage = action.payload;
    },
  },
});

export const categorySelectors = {
  // Memoized selector to get all categories
  categories: createSelector(
    (state: RootState) => state.category.categoryIds,
    (state: RootState) => state.category.categoriesNormalized,
    (idList, normalized) => {
      return idList.map((categoryId) => {
        return normalized[categoryId];
      });
    }
  ),
  recentlyAddedCategories: createSelector(
    (state: RootState) => state.category.recentlyAddedIds,
    (state: RootState) => state.category.categoriesNormalized,
    (idList, normalized) => {
      return idList.map((categoryId) => {
        return normalized[categoryId];
      });
    }
  ),
  categoryById: (state: RootState, categoryId: number) => {
    return state.category.categoriesNormalized[categoryId];
  },
  isLastPage: (state: RootState) => state.category.isLastPage,
  isLoadingReadCategories: (state: RootState) => state.category.loading === 'read',
  isLoadingRefreshCategories: (state: RootState) => state.category.loading === 'refresh',
  isLoadingAddCategory: (state: RootState) => state.category.loading === 'add',
  isLoadingDeleteCategory: (state: RootState) => state.category.loading === 'delete',
  isLoadingUpdateCategory: (state: RootState) => state.category.loading === 'update',
};
