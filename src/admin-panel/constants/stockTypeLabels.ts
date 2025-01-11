export const STOCK_TYPE_LABELS = {
  Piece: 'Piece',
  cm: 'cm',
  Dozen: 'Dozen',
  gram: 'gram',
  kg: 'kg',
  Person: 'Person',
  Package: 'Package',
  metre: 'metre',
  m2: 'm2',
  pair: 'pair',
};

export type StockTypeLabels = keyof typeof STOCK_TYPE_LABELS;
