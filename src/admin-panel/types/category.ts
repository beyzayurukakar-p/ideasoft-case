import { WithId, WithoutIdCreatedAt } from './typeUtils';

/* For requests */

/** Category's shape in the API request body for 'add'  */
export type CategoryAddRequest = WithoutIdCreatedAt<CategoryResponse>;

/** Category's shape in the redux 'add' action's payload */
export type CategoryAddPayload = Pick<Category, 'name' | 'status'>;

/** Category's shape in the API request body for 'update' */
export type CategoryUpdateRequest = WithId<Partial<Omit<CategoryResponse, 'id'>>>;

/** Category's shape in the redux 'update' action's payload */
export type CategoryUpdatePayload = WithId<Partial<Omit<Category, 'id'>>>;

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
export type Category = CategoryResponse & { deleted?: boolean };

export type CategoriesNormalized = Record<string, Category>;
