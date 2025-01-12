import { AxiosResponse } from 'axios';
import { ProductResponse } from '../types/responses';
import { client } from '../../common/services/client';

const URL = 'admin-api/produasdcts';

/**
 * Fetches products
 * @returns Array of products (Promise). Or throws error.
 */
export const readProducts = async () => {
  const response: AxiosResponse<ProductResponse[]> = await client.get(URL);

  return response.data;
};
