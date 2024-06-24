export type BannerCardVariant = 'fill' | 'empty' | 'add';

export type BannerCardType = 'file-system' | 'modal';

export interface BannerProps {
  id: string;
  name: string;
  uri: string;
}

export interface BannerCardProps {
  variant?: BannerCardVariant;
  type?: BannerCardType;
  banner?: BannerProps;
  isLoading?: boolean;
  isDisabled?: boolean;
  onDelete?(id: string): void;
  onGetFile?(file: File | null): void;
  onModal?(): void;
}
