export type WithId<T> = T & { id: number };
export type WithoutIdCreatedAt<T> = Omit<T, 'id' | 'createdAt'>;
