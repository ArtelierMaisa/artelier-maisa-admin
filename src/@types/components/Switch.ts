export type SwitchVariant = 'eyes' | 'neutral';

export interface SwitchProps {
  checked: boolean;
  variant?: SwitchVariant;
  isDisabled?: boolean;
  onToggle?(checked: boolean): void;
}
