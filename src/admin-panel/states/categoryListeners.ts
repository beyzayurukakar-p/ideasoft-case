import { tryCalling, tryCallingWithSuccess } from '../../common/services/tryCalling';
import { StartAppListening } from '../../common/store/types';
import { addCategory } from '../services/addCategory';
import { deleteCategory } from '../services/deleteCategory';
import { PAGE_LIMIT, readCategories } from '../services/readCategories';
import { updateCategory } from '../services/updateCategory';
import { categorySlice } from './categorySlice';
import { productSlice } from './productSlice';

export const startCategoryListeners = (startAppListening: StartAppListening) => {
  readCategoriesListener(startAppListening);
  refreshCategoriesListener(startAppListening);
  deleteCategoryListener(startAppListening);
  addCategoryListener(startAppListening);
  updateCategoryListener(startAppListening);
  addNextPageListener(startAppListening);
};

const readCategoriesListener = (startAppListening: StartAppListening) => {
  startAppListening({
    actionCreator: categorySlice.actions.readCategories,
    effect: async (action, listenerApi) => {
      // Check if categories have already been fetched
      if (listenerApi.getState().category.categoryIds.length > 0) {
        return;
      }

      // Start loading
      listenerApi.dispatch(categorySlice.actions._setLoading('read'));

      // Call service
      const [categories, error] = await tryCalling(readCategories, { page: 1 });

      // End loading
      listenerApi.dispatch(categorySlice.actions._setLoading(null));

      // Handle error
      if (error || !categories) {
        action.payload.onError?.();
        return;
      }

      // Set categories in state and call onSuccess callback
      listenerApi.dispatch(categorySlice.actions._setCategories({ categories, page: 1 }));
      action.payload.onSuccess?.(categories);
    },
  });
};

const refreshCategoriesListener = (startAppListening: StartAppListening) => {
  startAppListening({
    actionCreator: categorySlice.actions.refresh,
    effect: async (action, listenerApi) => {
      // Start loading
      listenerApi.dispatch(categorySlice.actions._setLoading('refresh'));

      // Call service
      const [categories, error] = await tryCalling(readCategories, { page: 1 });

      // End loading
      listenerApi.dispatch(categorySlice.actions._setLoading(null));

      // Handle error
      if (error || !categories) {
        action.payload.onError?.();
        return;
      }

      // Set categories in state and call onSuccess callback
      listenerApi.dispatch(categorySlice.actions._setCategories({ categories, page: 1 }));
      listenerApi.dispatch(categorySlice.actions._setIsLastPage(false));
      action.payload.onSuccess?.(categories);
    },
  });
};

const addNextPageListener = (startAppListening: StartAppListening) => {
  startAppListening({
    actionCreator: categorySlice.actions.readNextPage,
    effect: async (action, listenerApi) => {
      // Check if this is the last page
      if (listenerApi.getState().category.isLastPage) {
        return;
      }

      const currentPage = listenerApi.getState().category.currentPage;
      const nextPage = currentPage ? currentPage + 1 : 1;

      // Call service
      const [categories, error] = await tryCalling(readCategories, {
        page: nextPage,
      });

      // Handle error
      if (error || !categories) {
        action.payload.onError?.();
        return;
      }

      // Set categories in state
      listenerApi.dispatch(categorySlice.actions._addNextPage({ categories, page: nextPage }));

      // Check again if this is now the last page
      if (categories.length < PAGE_LIMIT) {
        listenerApi.dispatch(categorySlice.actions._setIsLastPage(true));
      }

      // Call onSuccess callback
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
