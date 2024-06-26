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
  price: number;
  images: ImageProps[];
  material: string;
  size: string;
  weight: number;
  whatsapp: string;
  createdAt: number;
  updatedAt?: number;
}

type ProductFiles = [File, File?, File?, File?];

export type ProductCreateProps = Omit<
  Product,
  'images' | 'createdAt' | 'updatedAt' | 'id'
> & {
  categoryId: string;
  files: ProductFiles;
};

export type ProductEditProps = Omit<
  Product,
  'createdAt' | 'updatedAt'
> & {
  categoryId: string;
  files?: ProductFiles;
};