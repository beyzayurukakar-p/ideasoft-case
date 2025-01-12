import { StartAppListening } from '../../common/store/types';
import { productSlice } from './productSlice';

export const startProductListeners = (startAppListening: StartAppListening) => {
  startAppListening({
    actionCreator: productSlice.actions.getProducts,
    effect: () => {},
  });
};
