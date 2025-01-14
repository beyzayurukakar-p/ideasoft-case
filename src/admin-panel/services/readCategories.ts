import { AxiosResponse } from 'axios';
import { CategoryResponse } from '../types/category';
import { client } from '../../common/services/client';
import { Category } from '../types/category';
import { CATEGORIES_URL } from './urls';

/**
 * Fetches categories
 * @returns Array of categories (Promise). Or throws error.
 */
export const readCategories = async () => {
  const response: AxiosResponse<CategoryResponse[]> = await client.get(CATEGORIES_URL);

  return response.data as Category[];
};
