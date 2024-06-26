export type ProductModalVariant = 'edit' | 'add';

export interface ProductModalImageProps {
  id: string;
  name: string;
  uri: string;
}

export interface ProductModalDataProps {
  id: string;
  name: string;
  description: string;
  isOccult: boolean;
  material: string | null;
  size: string | null;
  weight: string | null;
  whatsapp: string | null;
  price: string;
  images: ProductModalImageProps[];
}

export type ProductModalAddDataProps = ProductModalDataProps & {
  files: File[];
};

export interface ProductModalProps {
  variant: ProductModalVariant;
  isOpen: boolean;
  onClose?(): void;
  onAdd?(product: ProductModalAddDataProps): void;
}

export type ProductModalActiveType = 'intro' | 'details' | 'photos';

export type IntroDataProps = Pick<
  ProductModalDataProps,
  'description' | 'name' | 'isOccult'
>;

export interface IntroProps {
  variant: ProductModalVariant;
  data?: IntroDataProps;
  onContinue(introData: IntroDataProps): void;
  onClose?(): void;
}

export type DetailsDataProps = Pick<
  ProductModalDataProps,
  'material' | 'price' | 'size' | 'weight' | 'whatsapp'
>;

export interface DetailsProps {
  variant: ProductModalVariant;
  data?: DetailsDataProps;
  onContinue(detailsData: DetailsDataProps): void;
  onGoBack(): void;
  onClose?(): void;
}

export interface PhotosProps {
  variant: ProductModalVariant;
  data?: ProductModalImageProps[];
  onAdd(images: ProductModalImageProps[], files: File[]): void;
  onGoBack(): void;
  onClose?(): void;
}
