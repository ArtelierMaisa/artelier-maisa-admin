import { DataSnapshot } from 'firebase/database';

export function mapper<T>(snapshot: DataSnapshot): T {
  const values = snapshot.val();
  return Object.keys(values).map(key => ({
    ...values[key],
    id: key,
  })) as T;
}