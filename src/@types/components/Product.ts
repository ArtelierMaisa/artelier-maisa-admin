export interface ProductImageProps {
  id: string;
  name: string;
  uri: string;
}

export interface ProductProps {
  id: string;
  name: string;
  images: ProductImageProps[];
  isOccult: boolean;
  onUpdate?(id: string): void;
  onDelete?(id: string): void;
}
