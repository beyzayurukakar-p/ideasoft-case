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

export const stockTypeLabelOptions = Object.keys(STOCK_TYPE_LABELS).map((key) => ({
  value: key,
  label: key,
}));

export type StockTypeLabels = keyof typeof STOCK_TYPE_LABELS;
