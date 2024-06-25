export type EventModalVariant = 'edit' | 'add';

export interface EventModalImageProps {
  id: string;
  name: string;
  uri: string;
}

export interface EventModalDataProps {
  id: string;
  name: string;
  description: string;
  image: EventModalImageProps;
}

export interface EventModalAdd {
  id: string;
  name: string;
  description: string;
  file: File;
}

export interface EventModalProps {
  variant: EventModalVariant;
  isOpen: boolean;
  data?: EventModalDataProps;
  onClose?(): void;
  onAdd?(data: EventModalAdd): void;
}
