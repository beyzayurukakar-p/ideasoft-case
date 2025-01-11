import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';
import { listenerMiddleware } from './listenerMiddleware';
import { startProductListeners } from '../../admin-panel/states/productListeners';
import { startCategoryListeners } from '../../admin-panel/states/categoryListeners';

// Redux Store configuration

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

startProductListeners();
startCategoryListeners();

export type AppDispatch = typeof store.dispatch;
