import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';
import { listenerMiddleware } from './listenerMiddleware';
import { startAllListeners } from './listeners';

// Redux Store configuration

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).prepend(listenerMiddleware.middleware),
});

startAllListeners(listenerMiddleware.startListening);
