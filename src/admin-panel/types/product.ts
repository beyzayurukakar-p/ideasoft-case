import { StockTypeLabels } from '../constants/stockTypeLabels';

export type Product = {
  id: number;
  name: string;
  fullName: string;
  sku: string;
  stockAmount: number;
  price: number;
  currencyAbbr: string;
  status: number;
  stockTypeLabel: StockTypeLabels;
  imageThumbUrl: string;
  imageOriginalUrl: string;
  categoryId: number;
  categoryName: string;
  createdAt: string;
};
export type ProductsNormalized = Record<string, Product>;
