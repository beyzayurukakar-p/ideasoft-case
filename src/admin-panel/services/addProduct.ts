import { AxiosResponse } from 'axios';
import { client } from '../../common/services/client';
import { PRODUCTS_URL } from './urls';
import { Product, ProductAddPayload, ProductAddRequest, ProductResponse } from '../types/product';
import { getImageUrl } from './getImageUrl';
import { SelectedProductImage } from '../components/image-input/types';

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
  // Add sort order to images
  body.images = product.images?.map((image, index) => {
    const _image = image as SelectedProductImage;
    return {
      filename: _image.filename,
      extension: _image.extension,
      attachment: _image.attachment,
      sortOrder: index + 1,
    };
  });

  const response: AxiosResponse<ProductResponse> = await client.post(PRODUCTS_URL, body);

  const productRes = response.data;
  const convertedProduct: Product = {
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

  return convertedProduct;
};
