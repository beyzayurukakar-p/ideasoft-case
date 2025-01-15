import { AxiosResponse } from 'axios';
import { client } from '../../common/services/client';
import { PRODUCTS_URL } from './urls';
import { Product, ProductAddPayload, ProductAddRequest, ProductResponse } from '../types/product';

/**
 * Adds a product
 */
export const addProduct = async (product: ProductAddPayload): Promise<Product> => {
  const body: ProductAddRequest = {
    categories: product.categories,
    currency: {
      id: product.currencyId,
    },
    name: product.name,
    price1: product.price,
    sku: product.sku,
    status: product.status,
    stockAmount: product.stockAmount,
    stockTypeLabel: product.stockTypeLabel,
  };
  const response: AxiosResponse<ProductResponse> = await client.post(PRODUCTS_URL, body);

  const productRes = response.data;
  const convertedProduct: Product = {
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
    currencyId: productRes.currency.id,
    currencyAbbr: productRes.currency.abbr,
    categories: productRes.categories,
    createdAt: productRes.createdAt,
  };

  return convertedProduct;
};
