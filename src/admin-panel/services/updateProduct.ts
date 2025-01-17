import { AxiosResponse } from 'axios';
import { client } from '../../common/services/client';
import {
  ExistingProductImage,
  Product,
  ProductResponse,
  ProductUpdatePayload,
  ProductUpdateRequest,
} from '../types/product';
import { PRODUCTS_URL } from '../constants/urls';
import { getImageUrl } from '../utils/getImageUrl';
import { SelectedProductImage } from '../components/image-input/types';

/**
 * Updates a product
 * @returns Updated category (Promise). Or throws error.
 */
export const updateProduct = async (product: ProductUpdatePayload): Promise<Product> => {
  const body: ProductUpdateRequest = {
    id: product.id,
  };

  /*
  These checks make sure existing data is not overwritten by mistake
  */
  if (product.categories !== undefined) {
    body.categories = product.categories;
  }
  if (product.currencyId !== undefined) {
    body.currency = { id: product.currencyId };
  }
  if (product.name !== undefined) {
    body.name = product.name;
  }
  if (product.price !== undefined) {
    body.price1 = product.price;
  }
  if (product.sku !== undefined) {
    body.sku = product.sku;
  }
  if (product.status !== undefined) {
    body.status = product.status;
  }
  if (product.stockAmount !== undefined) {
    body.stockAmount = product.stockAmount;
  }
  if (product.stockTypeLabel !== undefined) {
    body.stockTypeLabel = product.stockTypeLabel;
  }
  if (product.images !== undefined) {
    // Add sort order to images
    body.images = product.images?.map((image, index) => {
      if ('id' in image) {
        // This image was already in product
        const _image = image as ExistingProductImage;
        return _image;
      } else {
        // This image is picked and new
        const _image = image as SelectedProductImage;
        return {
          filename: _image.filename,
          extension: _image.extension,
          attachment: _image.attachment,
          sortOrder: index + 1,
        };
      }
    });
  }

  const response: AxiosResponse<ProductResponse> = await client.put(
    `${PRODUCTS_URL}/${product.id}`,
    body
  );

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
