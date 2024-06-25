export type CategoryModalVariant = 'edit' | 'add';

export interface CategoryModalDataProps {
  id: string;
  name: string;
}

export interface CategoryModalProps {
  isOpen: boolean;
  variant: CategoryModalVariant;
  data?: CategoryModalDataProps;
  onClose?(): void;
  onAccept?(name: string): void;
}
