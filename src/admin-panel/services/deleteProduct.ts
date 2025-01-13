import { client } from '../../common/services/client';

const URL = 'admin-api/products';

/**
 * Deletes a product by ID
 */
export const deleteProduct = async (productId: number): Promise<void> => {
  await client.delete(`${URL}/${productId}`);
};
