export type DotButtonVariant = 'medium' | 'small' | 'x-small';

export type DotButtonType = 'add' | 'next' | 'previous' | 'pencil';

export type DotButtonMode = 'button' | 'figure';

export interface DotButtonProps {
  variant?: DotButtonVariant;
  type?: DotButtonType;
  mode?: DotButtonMode;
  onClick?(): void;
}
