interface ImageProps {
  id: string;
  name: string;
  uri: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  isOccult: boolean;
  price: string;
  images: ImageProps[];
  material: string | null;
  size: string | null;
  weight: string | null;
  whatsapp: string | null;
  createdAt: number;
  updatedAt?: number;
}

export type ProductCreateProps = Omit<
  Product,
  'images' | 'createdAt' | 'updatedAt' | 'id'
> & {
  categoryId: string;
  files: File[];
};

export type ProductEditProps = Omit<
  Product,
  'createdAt' | 'updatedAt' | 'images'
> & {
  categoryId: string;
  files?: File[];
};
