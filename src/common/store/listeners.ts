import { ListenerMiddlewareInstance } from '@reduxjs/toolkit';
import { startCategoryListeners } from '../../admin-panel/states/categoryListeners';
import { startProductListeners } from '../../admin-panel/states/productListeners';
import { StartAppListening } from './types';

export const startAllListeners = (startListening: ListenerMiddlewareInstance['startListening']) => {
  const startAppListening = startListening as StartAppListening;

  startProductListeners(startAppListening);
  startCategoryListeners();
};
