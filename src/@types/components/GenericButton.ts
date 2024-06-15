export type GenericButtonVariant = 'primary' | 'secondary';

export type GenericButtonType = 'medium' | 'small';

export type GenericButtonMode = 'button' | 'submit';

export interface GenericButtonProps {
  title: string;
  variant?: GenericButtonVariant;
  type?: GenericButtonType;
  mode?: GenericButtonMode;
  isDisabled?: boolean;
  isHugWidth?: boolean;
  isLoading?: boolean;
  onClick?(): void;
}
