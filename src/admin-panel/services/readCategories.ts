import { AxiosResponse } from 'axios';
import { CategoryResponse } from '../types/category';
import { client } from '../../common/services/client';
import { Category } from '../types/category';

const URL = 'admin-api/categories';

/**
 * Fetches categories
 * @returns Array of categories (Promise). Or throws error.
 */
export const readCategories = async () => {
  const response: AxiosResponse<CategoryResponse[]> = await client.get(URL);

  return response.data as Category[];
};
