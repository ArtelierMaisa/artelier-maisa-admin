export type EventModalVariant = 'edit' | 'add';

export interface EventModalDataProps {
  id: string;
}

export interface EventModalAdd {
  id: string;
  name: string;
  description: string;
  file: File | null;
}

export interface EventModalProps {
  variant: EventModalVariant;
  isOpen: boolean;
  data?: EventModalDataProps;
  onClose?(): void;
}
