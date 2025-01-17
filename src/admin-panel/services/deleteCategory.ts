import { client } from '../../common/services/client';
import { CATEGORIES_URL } from '../constants/urls';

/**
 * Deletes a category by ID
 */
export const deleteCategory = async (categoryId: number): Promise<void> => {
  await client.delete(`${CATEGORIES_URL}/${categoryId}`);
};
