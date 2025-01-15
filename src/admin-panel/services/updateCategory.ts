import { AxiosResponse } from 'axios';
import { client } from '../../common/services/client';
import { Category, CategoryResponse, CategoryUpdateRequest } from '../types/category';
import { CATEGORIES_URL } from './urls';

/**
 * Updates a category
 */
export const updateCategory = async (category: CategoryUpdateRequest): Promise<Category> => {
  const response: AxiosResponse<CategoryResponse> = await client.put(
    `${CATEGORIES_URL}/${category.id}`,
    category
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
