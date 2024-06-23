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
}
