import { BASE_URL } from '../../common/services/client';
import { ProductImageResponse } from '../types/product';

const CDN_URL = '//ideacdn.net/idea/kh/32';

export const getImageUrl = (image: ProductImageResponse) => {
  return image.originalUrl.replace(CDN_URL, BASE_URL);
};
