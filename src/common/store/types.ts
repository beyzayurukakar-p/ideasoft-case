import { TypedStartListening } from '@reduxjs/toolkit';
import { store } from './configuration';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type StartAppListening = TypedStartListening<RootState, AppDispatch>;
