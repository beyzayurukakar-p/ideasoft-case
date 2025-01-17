import { AxiosResponse } from 'axios';
import { CategoryResponse } from '../types/category';
import { client } from '../../common/services/client';
import { Category } from '../types/category';
import { CATEGORIES_URL } from '../constants/urls';

export const PAGE_LIMIT = 20;

/**
 * Searches categories
 * @returns Array of categories (Promise). Or throws error.
 */
export const searchCategories = async (params: { searchText: string }): Promise<Category[]> => {
  const response: AxiosResponse<CategoryResponse[]> = await client.get(
    `${CATEGORIES_URL}?s=${params.searchText}`
  );

  return response.data;
};
