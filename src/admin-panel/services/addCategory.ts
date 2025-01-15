import { AxiosResponse } from 'axios';
import { client } from '../../common/services/client';
import {
  Category,
  CategoryAddPayload,
  CategoryAddRequest,
  CategoryResponse,
} from '../types/category';
import { CATEGORIES_URL } from './urls';

/**
 * Adds a category
 */
export const addCategory = async (category: CategoryAddPayload): Promise<Category> => {
  const body: CategoryAddRequest = category;
  const response: AxiosResponse<CategoryResponse> = await client.post(CATEGORIES_URL, body);

  const categoryResponse = response.data;
  const convertedCategory: Category = {
    id: categoryResponse.id,
    name: categoryResponse.name,
    status: categoryResponse.status,
    createdAt: categoryResponse.createdAt,
  };

  return convertedCategory;
};
