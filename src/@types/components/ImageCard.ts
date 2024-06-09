export type ImageCardType = 'photo' | 'edit';

export interface ImageCardProps {
  type?: ImageCardType;
  onGetFile?(file: File | null): void;
}
