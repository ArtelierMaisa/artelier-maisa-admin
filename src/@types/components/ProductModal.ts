export type ProductModalVariant = 'edit' | 'add';

export interface ProductModalImageProps {
  id: string;
  name: string;
  uri: string;
}

export type ProductModalImagesProps = [
  ProductModalImageProps,
  ProductModalImageProps?,
  ProductModalImageProps?,
  ProductModalImageProps?,
];

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
  images: ProductModalImagesProps;
}

export interface ProductModalProps {
  variant: ProductModalVariant;
  isOpen: boolean;
  data?: ProductModalDataProps;
  onClose?(): void;
  onAdd?(): void;
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
  data?: ProductModalImagesProps;
  onAdd(photosData: ProductModalImagesProps): void;
  onGoBack(): void;
  onClose?(): void;
}
