import { ExistingProductImage, NewProductImage } from '../../types/product';

export type SelectedProductImage = Omit<NewProductImage, 'sortOrder'> & { url: string };
export type InputImage = SelectedProductImage | ExistingProductImage;
