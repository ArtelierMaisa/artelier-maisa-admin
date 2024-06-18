export type BannerCardVariant = 'fill' | 'empty' | 'add';

export interface BannerProps {
  id: string;
  name: string;
  uri: string;
}

export interface BannerCardProps {
  variant?: BannerCardVariant;
  banner?: BannerProps;
  isLoading?: boolean;
  onDelete?(id: string): void;
  onGetFile?(file: File | null): void;
}
