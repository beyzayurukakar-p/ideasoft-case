import { tryCalling, tryCallingWithSuccess } from '../../common/services/tryCalling';
import { StartAppListening } from '../../common/store/types';
import { addProduct } from '../services/addProduct';
import { deleteProduct } from '../services/deleteProduct';
import { PAGE_LIMIT } from '../services/readCategories';
import { readProducts } from '../services/readProducts';
import { updateProduct } from '../services/updateProduct';
import { productSlice } from './productSlice';

export const startProductListeners = (startAppListening: StartAppListening) => {
  readProductsListener(startAppListening);
  refreshProductsListener(startAppListening);
  deleteProductListener(startAppListening);
  addProductListener(startAppListening);
  updateProductListener(startAppListening);
  addNextPageListener(startAppListening);
};

const readProductsListener = (startAppListening: StartAppListening) => {
  startAppListening({
    actionCreator: productSlice.actions.readProducts,
    effect: async (action, listenerApi) => {
      // Check if products have already been fetched
      if (listenerApi.getState().product.productIds.length > 0) {
        return;
      }

      // Start loading
      listenerApi.dispatch(productSlice.actions._setLoading('read'));

      // Call service
      const [products, error] = await tryCalling(readProducts, { page: 1 });

      // End loading
      listenerApi.dispatch(productSlice.actions._setLoading(null));

      // Handle error
      if (error || !products) {
        action.payload.onError?.();
        return;
      }

      // Set products in state and call onSuccess callback
      listenerApi.dispatch(productSlice.actions._setProducts({ products, page: 1 }));
      action.payload.onSuccess?.(products);
    },
  });
};

const refreshProductsListener = (startAppListening: StartAppListening) => {
  startAppListening({
    actionCreator: productSlice.actions.refresh,
    effect: async (action, listenerApi) => {
      // Start loading
      listenerApi.dispatch(productSlice.actions._setLoading('refresh'));

      // Call service
      const [products, error] = await tryCalling(readProducts, { page: 1 });

      // End loading
      listenerApi.dispatch(productSlice.actions._setLoading(null));

      // Handle error
      if (error || !products) {
        action.payload.onError?.();
        return;
      }

      // Set products in state and call onSuccess callback
      listenerApi.dispatch(productSlice.actions._setProducts({ products, page: 1 }));
      listenerApi.dispatch(productSlice.actions._setIsLastPage(false));
      action.payload.onSuccess?.(products);
    },
  });
};

const addNextPageListener = (startAppListening: StartAppListening) => {
  startAppListening({
    actionCreator: productSlice.actions.readNextPage,
    effect: async (action, listenerApi) => {
      // Check if this is the last page
      if (listenerApi.getState().product.isLastPage) {
        return;
      }

      const currentPage = listenerApi.getState().product.currentPage;
      const nextPage = currentPage ? currentPage + 1 : 1;

      // Call service
      const [products, error] = await tryCalling(readProducts, {
        page: nextPage,
      });

      // Handle error
      if (error || !products) {
        action.payload.onError?.();
        return;
      }

      // Set products in state
      listenerApi.dispatch(productSlice.actions._addNextPage({ products, page: nextPage }));

      // Check again if this is now the last page
      if (products.length < PAGE_LIMIT) {
        listenerApi.dispatch(productSlice.actions._setIsLastPage(true));
      }

      // Call onSuccess callback
      action.payload.onSuccess?.(products);
    },
  });
};

const deleteProductListener = (startAppListening: StartAppListening) => {
  startAppListening({
    actionCreator: productSlice.actions.deleteProduct,
    effect: async (action, listenerApi) => {
      // Start loading
      listenerApi.dispatch(productSlice.actions._setLoading('delete'));

      // Call service
      const [_, error] = await tryCalling(deleteProduct, action.payload.id);

      // End loading
      listenerApi.dispatch(productSlice.actions._setLoading(null));

      // Handle error
      if (error) {
        action.payload.onError?.();
        return;
      }

      // Update state and call onSuccess
      listenerApi.dispatch(productSlice.actions._deleteProduct(action.payload.id));
      action.payload.onSuccess?.();
    },
  });
};

const addProductListener = (startAppListening: StartAppListening) => {
  startAppListening({
    actionCreator: productSlice.actions.addProduct,
    effect: async (action, listenerApi) => {
      const product = action.payload.product;

      // Start loading
      listenerApi.dispatch(productSlice.actions._setLoading('add'));

      // Call service
      const [productAdded, error] = await tryCallingWithSuccess(addProduct, product);

      // End loading
      listenerApi.dispatch(productSlice.actions._setLoading(null));

      // Handle error
      if (error || !productAdded) {
        action.payload.onError?.();
        return;
      }

      // Update state and call onSuccess callback
      listenerApi.dispatch(productSlice.actions._addProduct(productAdded));
      action.payload.onSuccess?.(productAdded);
    },
  });
};

const updateProductListener = (startAppListening: StartAppListening) => {
  startAppListening({
    actionCreator: productSlice.actions.updateProduct,
    effect: async (action, listenerApi) => {
      const product = action.payload.product;

      // Start loading
      listenerApi.dispatch(productSlice.actions._setLoading('update'));

      // Call service
      const [productUpdated, error] = await tryCallingWithSuccess(updateProduct, product);

      // End loading
      listenerApi.dispatch(productSlice.actions._setLoading(null));

      // Handle error
      if (error || !productUpdated) {
        action.payload.onError?.();
        return;
      }

      // Update state and call onSuccess callback
      listenerApi.dispatch(productSlice.actions._updateProduct(productUpdated));
      action.payload.onSuccess?.(productUpdated);
    },
  });
};
