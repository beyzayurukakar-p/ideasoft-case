import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';

// Redux Store configuration

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
