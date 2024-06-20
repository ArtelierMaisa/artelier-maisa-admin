import { AsyncStorageKeyType, AsyncStorageProps } from '../@types';

export const AsyncStorage: AsyncStorageProps = {
  get<T>(key: AsyncStorageKeyType): T | null {
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data) as T;
    return null;
  },

  set<T>(key: AsyncStorageKeyType, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  },

  clearAll(): void {
    localStorage.clear();
  },
};
