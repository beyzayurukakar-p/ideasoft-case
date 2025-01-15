import { AxiosResponse } from 'axios';
import { CategoryResponse } from '../types/category';
import { client } from '../../common/services/client';
import { Category } from '../types/category';
import { CATEGORIES_URL } from './urls';

export const PAGE_LIMIT = 20;

/**
 * Fetches categories
 * @returns Array of categories (Promise). Or throws error.
 */
export const readCategories = async (params: { page: number }): Promise<Category[]> => {
  console.log('reading categories');
  const response: AxiosResponse<CategoryResponse[]> = await client.get(
    `${CATEGORIES_URL}?page=${params.page}&limit=${PAGE_LIMIT}`
  );

  const categoriesResponse = response.data;
  const convertedCategories: Category[] = categoriesResponse.map((category) => ({
    id: category.id,
    name: category.name,
    status: category.status,
    createdAt: category.createdAt,
  }));

  return convertedCategories;
};
