interface ImageProps {
  id: string;
  name: string;
  uri: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  isOcult: boolean;
  price: string;
  images: [ImageProps, ImageProps?, ImageProps?, ImageProps?];
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
  'createdAt' | 'updatedAt'
> & {
  categoryId: string;
  files?: ProductFiles;
};