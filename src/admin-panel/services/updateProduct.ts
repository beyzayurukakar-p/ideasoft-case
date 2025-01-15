import { AxiosResponse } from 'axios';
import { client } from '../../common/services/client';
import {
  Product,
  ProductResponse,
  ProductUpdatePayload,
  ProductUpdateRequest,
} from '../types/product';
import { PRODUCTS_URL } from './urls';

/**
 * Updates a product
 */
export const updateProduct = async (product: ProductUpdatePayload): Promise<Product> => {
  const body: ProductUpdateRequest = {
    id: product.id,
  };

  undefined !== product.categories && (body.categories = product.categories);
  undefined !== product.currencyId && (body.currency = { id: product.currencyId });
  undefined !== product.name && (body.name = product.name);
  undefined !== product.price && (body.price1 = product.price);
  undefined !== product.sku && (body.sku = product.sku);
  undefined !== product.status && (body.status = product.status);
  undefined !== product.stockAmount && (body.stockAmount = product.stockAmount);
  undefined !== product.stockTypeLabel && (body.stockTypeLabel = product.stockTypeLabel);

  const response: AxiosResponse<ProductResponse> = await client.put(
    `${PRODUCTS_URL}/${product.id}`,
    body
  );

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
