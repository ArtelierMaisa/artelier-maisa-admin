export type GenericButtonVariant = 'primary' | 'secondary';

export type GenericButtonType = 'medium' | 'small';

export interface GenericButtonProps {
  title: string;
  variant?: GenericButtonVariant;
  type?: GenericButtonType;
  isDisabled?: boolean;
  isHugWidth?: boolean;
  isLoading?: boolean;
  onClick?(): void;
}