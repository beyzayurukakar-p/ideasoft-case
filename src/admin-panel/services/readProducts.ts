import { AxiosResponse } from 'axios';
import { ProductResponse } from '../types/product';
import { client } from '../../common/services/client';
import { Product } from '../types/product';
import { PRODUCTS_URL } from '../constants/urls';
import { getImageUrl } from '../utils/getImageUrl';

export const PAGE_LIMIT = 20;

/**
 * Reads products (by page)
 * @returns Array of products (Promise). Or throws error.
 */
export const readProducts = async (params: { page: number }): Promise<Product[]> => {
  const response: AxiosResponse<ProductResponse[]> = await client.get(
    `${PRODUCTS_URL}?page=${params.page}&limit=${PAGE_LIMIT}`
  );

  const productsResponse = response.data;

  // Convert data
  const convertedProducts: Product[] = productsResponse.map((productRes) => {
    return {
      id: productRes.id,
      name: productRes.name,
      fullName: productRes.fullName,
      images: productRes.images.map((image) => ({
        id: image.id,
        filename: image.filename,
        extension: image.extension,
        url: getImageUrl(image),
      })),
      sku: productRes.sku,
      price: productRes.price1,
      status: productRes.status,
      stockAmount: productRes.stockAmount,
      stockTypeLabel: productRes.stockTypeLabel,
      currencyId: productRes.currency.id,
      currencyAbbr: productRes.currency.abbr,
      categories: productRes.categories,
      createdAt: productRes.createdAt,
    };
  });

  return convertedProducts;
};
