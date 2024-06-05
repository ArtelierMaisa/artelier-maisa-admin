export type DotButtonVariant = 'medium' | 'small' | 'x-small';

export type DotButtonType = 'add' | 'next' | 'previous';

export interface DotButtonProps {
  variant?: DotButtonVariant;
  type?: DotButtonType;
  onClick?(): void;
}
