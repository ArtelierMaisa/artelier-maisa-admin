export type DialogVariant =
  | 'banner'
  | 'category'
  | 'product'
  | 'event'
  | 'sign-out';

export interface DialogDataProps {
  id: string;
  name?: string;
}

export interface DialogProps {
  isOpen: boolean;
  variant: DialogVariant;
  data?: DialogDataProps;
  isLoading?: boolean;
  onAccept?(): void;
  onClose?(): void;
}
