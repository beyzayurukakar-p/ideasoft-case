import { CategoryResponse } from './responses';

export type Category = CategoryResponse;

export type CategoriesNormalized = Record<string, Category>;
