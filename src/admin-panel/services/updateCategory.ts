import { AxiosResponse } from 'axios';
import { client } from '../../common/services/client';
import {
  Category,
  CategoryResponse,
  CategoryUpdatePayload,
  CategoryUpdateRequest,
} from '../types/category';
import { CATEGORIES_URL } from '../constants/urls';

/**
 * Updates a category.
 * @returns Updated category (Promise). Or throws error.
 */
export const updateCategory = async (category: CategoryUpdatePayload): Promise<Category> => {
  const body: CategoryUpdateRequest = category;
  const response: AxiosResponse<CategoryResponse> = await client.put(
    `${CATEGORIES_URL}/${category.id}`,
    body
  );

  const categoryResponse = response.data;
  const convertedCategory: Category = {
    id: categoryResponse.id,
    name: categoryResponse.name,
    status: categoryResponse.status,
    createdAt: categoryResponse.createdAt,
  };

  return convertedCategory;
};
