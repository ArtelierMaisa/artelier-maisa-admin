export type DotButtonVariant = 'medium' | 'small' | 'x-small';

export type DotButtonType = 'add' | 'next' | 'previous' | 'pencil';

export interface DotButtonProps {
  variant?: DotButtonVariant;
  type?: DotButtonType;
  isChild?: boolean;
  onClick?(): void;
}
