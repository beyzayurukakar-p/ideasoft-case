import { client } from '../../common/services/client';
import { PRODUCTS_URL } from '../constants/urls';

/**
 * Deletes a product by ID
 */
export const deleteProduct = async (productId: number): Promise<void> => {
  await client.delete(`${PRODUCTS_URL}/${productId}`);
};
