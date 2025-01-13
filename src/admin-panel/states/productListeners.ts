import { tryCalling } from '../../common/services/tryCalling';
import { StartAppListening } from '../../common/store/types';
import { deleteProduct } from '../services/deleteProduct';
import { readProducts } from '../services/readProducts';
import { ProductsNormalized } from '../types/product';
import { productSlice } from './productSlice';

export const startProductListeners = (startAppListening: StartAppListening) => {
  getProductsListener(startAppListening);
  deleteProductListener(startAppListening);
};

const getProductsListener = (startAppListening: StartAppListening) => {
  startAppListening({
    actionCreator: productSlice.actions.getProducts,
    effect: async (action, listenerApi) => {
      // Check if products have already been fetched
      if (listenerApi.getState().product.productsNormalized) {
        return;
      }

      // Start loading
      listenerApi.dispatch(productSlice.actions._setLoading('getProducts'));

      // Call service
      const [products, error] = await tryCalling(readProducts);

      // End loading
      listenerApi.dispatch(productSlice.actions._setLoading(null));

      // Handle error
      if (error || !products) {
        action.payload.onError?.();
        return;
      }

      // Normalize products to an object with id as key and value as product
      const productsNormalized = products.reduce((acc, product) => {
        acc[product.id] = product;
        return acc;
      }, {} as ProductsNormalized);

      // Set products in state and call onSuccess callback
      listenerApi.dispatch(productSlice.actions._setProducts(productsNormalized));
      action.payload.onSuccess?.(products);
    },
  });
};

const deleteProductListener = (startAppListening: StartAppListening) => {
  startAppListening({
    actionCreator: productSlice.actions.deleteProduct,
    effect: async (action, listenerApi) => {
      // Start loading
      listenerApi.dispatch(productSlice.actions._setLoading('deleteProduct'));

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
