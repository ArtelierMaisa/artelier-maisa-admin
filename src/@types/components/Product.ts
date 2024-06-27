export type ProductVariant = 'fill' | 'blank';

export interface ProductImageProps {
  id: string;
  name: string;
  uri: string;
}

export interface ProductProps {
  variant?: ProductVariant;
  id?: string;
  name?: string;
  images?: ProductImageProps[];
  isOccult?: boolean;
  onAdd?(): void;
  onUpdate?(id: string): void;
  onDelete?(id: string): void;
  onCheck?(): void;
}
