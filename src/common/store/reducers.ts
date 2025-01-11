import { combineSlices } from '@reduxjs/toolkit';
import { categorySlice } from '../../admin-panel/states/categorySlice';
import { productSlice } from '../../admin-panel/states/productSlice';

export const rootReducer = combineSlices(categorySlice, productSlice);
export type RootState = ReturnType<typeof rootReducer>;
