import { tryCalling, tryCallingWithSuccess } from '../../common/services/tryCalling';
import { StartAppListening } from '../../common/store/types';
import { addCategory } from '../services/addCategory';
import { deleteCategory } from '../services/deleteCategory';
import { readCategories } from '../services/readCategories';
import { updateCategory } from '../services/updateCategory';
import { CategoriesNormalized } from '../types/category';
import { categorySlice } from './categorySlice';
import { productSlice } from './productSlice';

export const startCategoryListeners = (startAppListening: StartAppListening) => {
  readCategoriesListener(startAppListening);
  deleteCategoryListener(startAppListening);
  addCategoryListener(startAppListening);
  updateCategoryListener(startAppListening);
};

const readCategoriesListener = (startAppListening: StartAppListening) => {
  startAppListening({
    actionCreator: categorySlice.actions.readCategories,
    effect: async (action, listenerApi) => {
      // Check if categories have already been fetched
      if (listenerApi.getState().category.categories) {
        return;
      }

      // Start loading
      listenerApi.dispatch(categorySlice.actions._setLoading('read'));

      // Call service
      const [categories, error] = await tryCalling(readCategories);

      // End loading
      listenerApi.dispatch(categorySlice.actions._setLoading(null));

      // Handle error
      if (error || !categories) {
        action.payload.onError?.();
        return;
      }

      // Normalize categories to an object with id as key and value as category
      const categoriesNormalized = categories.reduce((acc, category) => {
        acc[category.id] = category;
        return acc;
      }, {} as CategoriesNormalized);

      // Set categories in state and call onSuccess callback
      listenerApi.dispatch(categorySlice.actions._setCategories(categoriesNormalized));
      action.payload.onSuccess?.(categories);
    },
  });
};

const deleteCategoryListener = (startAppListening: StartAppListening) => {
  startAppListening({
    actionCreator: categorySlice.actions.deleteCategory,
    effect: async (action, listenerApi) => {
      const categoryId = action.payload.id;

      // Start loading
      listenerApi.dispatch(categorySlice.actions._setLoading('delete'));

      // Call service
      const [_, error] = await tryCalling(deleteCategory, categoryId);

      // End loading
      listenerApi.dispatch(categorySlice.actions._setLoading(null));

      // Handle error
      if (error) {
        action.payload.onError?.();
        return;
      }

      // Update categories in state
      listenerApi.dispatch(categorySlice.actions._deleteCategory(categoryId));
      // Also remove this category from products
      listenerApi.dispatch(productSlice.actions._categoryRemoved(categoryId));

      action.payload.onSuccess?.();
    },
  });
};

const addCategoryListener = (startAppListening: StartAppListening) => {
  startAppListening({
    actionCreator: categorySlice.actions.addCategory,
    effect: async (action, listenerApi) => {
      const category = action.payload.category;

      // Start loading
      listenerApi.dispatch(categorySlice.actions._setLoading('add'));

      // Call service
      const [categoryAdded, error] = await tryCallingWithSuccess(addCategory, category);

      // End loading
      listenerApi.dispatch(categorySlice.actions._setLoading(null));

      // Handle error
      if (error || !categoryAdded) {
        action.payload.onError?.();
        return;
      }

      // Update state and call onSuccess callback
      listenerApi.dispatch(categorySlice.actions._addCategory(categoryAdded));
      action.payload.onSuccess?.(categoryAdded);
    },
  });
};

const updateCategoryListener = (startAppListening: StartAppListening) => {
  startAppListening({
    actionCreator: categorySlice.actions.updateCategory,
    effect: async (action, listenerApi) => {
      const category = action.payload.category;

      // Start loading
      listenerApi.dispatch(categorySlice.actions._setLoading('update'));

      // Call service
      const [categoryUpdated, error] = await tryCallingWithSuccess(updateCategory, category);

      // End loading
      listenerApi.dispatch(categorySlice.actions._setLoading(null));

      // Handle error
      if (error || !categoryUpdated) {
        action.payload.onError?.();
        return;
      }

      // Update state and call onSuccess callback
      listenerApi.dispatch(categorySlice.actions._updateCategory(categoryUpdated));
      action.payload.onSuccess?.(categoryUpdated);
    },
  });
};
