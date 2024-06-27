export type SwitchVariant = 'eyes' | 'neutral';

export interface SwitchProps {
  htmlFor: string;
  checked: boolean;
  variant?: SwitchVariant;
  isDisabled?: boolean;
  onToggle?(checked: boolean): void;
}
