export type WithId<T> = T & { id: number };
export type WithoutId<T> = Omit<T, 'id'>;
