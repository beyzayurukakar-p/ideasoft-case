import { tryCalling } from '../../common/services/tryCalling';
import { StartAppListening } from '../../common/store/types';
import { deleteCategory } from '../services/deleteCategory';
import { readCategories } from '../services/readCategories';
import { CategoriesNormalized } from '../types/category';
import { categorySlice } from './categorySlice';

export const startCategoryListeners = (startAppListening: StartAppListening) => {
  readCategoriesListener(startAppListening);
  deleteCategoryListener(startAppListening);
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
      // Start loading
      listenerApi.dispatch(categorySlice.actions._setLoading('delete'));

      // Call service
      const [_, error] = await tryCalling(deleteCategory, action.payload.id);

      // End loading
      listenerApi.dispatch(categorySlice.actions._setLoading(null));

      // Handle error
      if (error) {
        action.payload.onError?.();
        return;
      }

      // Update state and call onSuccess
      listenerApi.dispatch(categorySlice.actions._deleteCategory(action.payload.id));
      action.payload.onSuccess?.();
    },
  });
};
