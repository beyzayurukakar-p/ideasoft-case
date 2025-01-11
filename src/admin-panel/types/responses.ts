import { StockTypeLabels } from '../constants/stockTypeLabels';

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
};

/** Category's shape in the API response */
export type CategoryResponse = {
  id: number;
  name: string;
  status: number; // 1: Active, 0: Inactive
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
