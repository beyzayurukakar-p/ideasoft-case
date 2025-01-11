import { AxiosResponse } from 'axios';
import { ProductResponse } from '../types/responses';
import { client } from '../../common/services/client';
import { GENERIC_ERROR_MESSAGE } from '../../common/services/constants';

const URL = 'admin-api/products';

/**
 * Fetches products
 * @returns Array of products. Or throws error.
 */
export const readProducts = async (): Promise<any> => {
  try {
    const response: AxiosResponse<ProductResponse[]> = await client.get(URL);

    return response.data;
  } catch (err) {
    throw GENERIC_ERROR_MESSAGE;
  }
};
