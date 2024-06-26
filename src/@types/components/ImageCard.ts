export type ImageCardType = 'photo' | 'edit';

export interface ImageCardProps {
  type?: ImageCardType;
  isDisabled?: boolean;
  onGetFile?(file: File | null): void;
}
