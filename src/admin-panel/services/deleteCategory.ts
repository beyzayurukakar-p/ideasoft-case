import { client } from '../../common/services/client';

const URL = 'admin-api/categories';

/**
 * Deletes a category by ID
 */
export const deleteCategory = async (categoryId: number): Promise<void> => {
  await client.delete(`${URL}/${categoryId}`);
};
