import { ExistingProductImage, NewProductImage } from '../../types/product';

/**
 * Represents a selected product image, omitting the `sortOrder` property from `NewProductImage`
 * and adding a `url` property.
 * Used by ImageInput to denote to picked images.
 */
export type SelectedProductImage = Omit<NewProductImage, 'sortOrder'> & { url: string };

/**
 * Represents an input image which can be either a selected product image or an existing product image.
 * Used by ImageInput to denote to existing images provided by API response.
 */
export type InputImage = SelectedProductImage | ExistingProductImage;
