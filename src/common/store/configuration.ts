import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';
import { listenerMiddleware } from './listenerMiddleware';

// Redux Store configuration

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
