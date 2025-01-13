import { WithoutId } from './typeUtils';

/* For requests */

/** Category's shape in the API request body for 'add'  */
export type CategoryAddRequest = WithoutId<CategoryResponse>;

/** Category's shape in the API request body for 'update' */
export type CategoryUpdateRequest = CategoryResponse;

/* For responses */

/** Category's shape in the API response */
export type CategoryResponse = {
  id: number;
  name: string;
  status: number; // 1: Active, 0: Inactive
  createdAt: string;
};

/* For the rest of the app */

/** Category's shape after being converted */
export type Category = CategoryResponse;

export type CategoriesNormalized = Record<string, Category>;
