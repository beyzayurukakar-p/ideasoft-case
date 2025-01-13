import { AxiosResponse } from 'axios';
import { ProductResponse } from '../types/product';
import { client } from '../../common/services/client';
import { Product } from '../types/product';

const URL = 'admin-api/products';

/**
 * Fetches products
 * @returns Array of products (Promise). Or throws error.
 */
export const readProducts = async () => {
  const response: AxiosResponse<ProductResponse[]> = await client.get(URL);

  const data = response.data;

  // Convert data
  const convertedData: Product[] = data.map((productRes) => {
    return {
      id: productRes.id,
      name: productRes.name,
      fullName: productRes.fullName,
      imageThumbUrl: productRes.images[0]?.thumbUrl,
      imageOriginalUrl: productRes.images[0]?.originalUrl,
      sku: productRes.sku,
      price: productRes.price1,
      status: productRes.status,
      stockAmount: productRes.stockAmount,
      stockTypeLabel: productRes.stockTypeLabel,
      currencyAbbr: productRes.currency.abbr,
      categoryId: productRes.categories[0]?.id,
      categoryName: productRes.categories[0]?.name,
      createdAt: productRes.createdAt,
    };
  });

  return convertedData;
};
