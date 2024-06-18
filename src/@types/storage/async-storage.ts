export type AsyncStorageKeyType = 'is-logged';

export interface AsyncStorageProps {
  get<T>(key: AsyncStorageKeyType): T | null;
  set<T>(key: AsyncStorageKeyType, value: T): void;
  clearAll(): void;
}
