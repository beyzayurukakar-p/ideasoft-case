import { StockTypeLabels } from '../constants/stockTypeLabels';
import { Category, CategoryResponse } from './category';
import { WithId, WithoutIdCreatedAt } from './typeUtils';

/* For requests */

// Product's shape in the API request body for 'add'
export type ProductAddRequest = Pick<
  ProductResponse,
  'name' | 'price1' | 'sku' | 'status' | 'stockAmount'
> &
  Partial<Pick<ProductResponse, 'categories' | 'stockTypeLabel'>> & {
    images?: Array<WithoutIdCreatedAt<ImageResponse & { attachment?: string }>>;
  } & {
    currency: WithId<Partial<CurrencyResponse>>;
  };

/** Product's shape in the redux 'add' action's payload */
export type ProductAddPayload = Pick<
  Product,
  'name' | 'sku' | 'status' | 'stockAmount' | 'price' | 'currencyId'
> &
  Partial<Pick<Product, 'categories' | 'stockTypeLabel'>>;

/** Product's shape in the API request body for 'update' */
export type ProductUpdateRequest = WithId<Partial<ProductAddRequest>>;

/** Product's shape in the redux 'update' action's payload */
export type ProductUpdatePayload = WithId<Partial<ProductAddPayload>>;

/* For responses */

/** Product's shape in the API response */
export type ProductResponse = {
  id: number;
  name: string;
  fullName: string;
  sku: string;
  stockAmount: number;
  price1: number;
  currency: CurrencyResponse;
  status: number; // 1: Active, 0: Inactive
  stockTypeLabel: StockTypeLabels;
  images: ImageResponse[];
  categories: CategoryResponse[];
  createdAt: string;
};

/** Currency's shape in the API response */
export type CurrencyResponse = {
  id: number;
  label: string;
  abbr: string;
};

/** Image's shape in the API response */
export type ImageResponse = {
  id: number;
  thumbUrl: string;
  originalUrl: string;
};

/* For the rest of the app */

/** Product's shape after being converted */
export type Product = {
  id: number;
  name: string;
  fullName: string;
  sku: string;
  stockAmount: number;
  price: number;
  currencyId: number;
  currencyAbbr: string;
  status: number;
  stockTypeLabel: StockTypeLabels;
  imageThumbUrl: string;
  imageOriginalUrl: string;
  categories: Category[];
  createdAt: string;
  deleted?: boolean;
};

export type ProductsNormalized = Record<number, Product>;

/**
 * A record such that keys are category ID
 * and values are the IDs of that category's products
 */
export type CategoryProducts = Record<number, number[]>;
