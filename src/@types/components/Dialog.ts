export type DialogVariant =
  | 'banner'
  | 'category'
  | 'product'
  | 'event'
  | 'sign-out';

export interface DialogProps {
  isOpen: boolean;
  variant: DialogVariant;
  isLoading?: boolean;
  onAccept?(): void;
  onClose?(): void;
}
