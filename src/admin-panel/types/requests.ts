import { CategoryResponse, ImageResponse, ProductResponse } from './responses';

type WithId<T> = T & { id: number };
type WithoutId<T> = Omit<T, 'id'>;

/** Product's shape in the API request body for 'add'  */
export type ProductAddRequest = WithoutId<
  ProductResponse & {
    images: Array<WithoutId<ImageResponse & { attachment: string }>>;
  }
>;

/** Product's shape in the API request body for 'update' */
export type ProductUpdateRequest = WithId<ProductAddRequest>;

/** Category's shape in the API request body for 'add'  */
export type CategoryAddRequest = WithoutId<CategoryResponse>;

/** Category's shape in the API request body for 'update' */
export type CategoryUpdateRequest = CategoryResponse;
