import { DataSnapshot } from 'firebase/database';

import { Categories, Product } from '../@types';

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
      products = Object.keys(values[key].products).map(productKey => {
        let images = null;

        if ('images' in values[key].products[productKey]) {
          images = Object.keys(values[key].products[productKey].images).map(
            imageKey => ({
              ...values[key].products[productKey].images[imageKey],
              id: imageKey,
            }),
          );
        }

        return {
          ...values[key].products[productKey],
          ...(images && { images }),
          id: productKey,
        };
      });
    }

    return { ...values[key], ...(products && { products }), id: key };
  }) as T;
}

export function productMapper(data: Categories): Product[] {
  return Object.entries(data.products).map(([id, product]) => ({
    ...(product as Product),
    id,
  }));
}
