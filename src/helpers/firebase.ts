import { DataSnapshot } from 'firebase/database';
import { Product } from '../@types';

export function mapper<T>(snapshot: DataSnapshot): T {
  const values = snapshot.val();
  return Object.keys(values).map(key => ({
    ...values[key],
    id: key,
  })) as T;
}

export function categoryMapper<T>(snapshot: DataSnapshot): T {
  const values = snapshot.val();
  return Object.keys(values).map(key => {
    let products = null;

    if ('products' in values[key]) {
      products = Object.keys(values[key].products).map(productKey => ({
        ...values[key].products[productKey],
        id: productKey,
      }));
    }

    return { ...values[key], ...(products && { products }), id: key };
  }) as T;
}

export function mapProducts(data: any): Product[] {
  return Object.entries(data.products).map(([id, product]) => ({
    ...(product as Product),
    id,
  }));
}
