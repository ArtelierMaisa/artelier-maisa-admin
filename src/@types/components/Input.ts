export type InputVariant = 'input' | 'textarea';

export type InputType =
  | 'email'
  | 'password'
  | 'size'
  | 'weight'
  | 'material'
  | 'whatsapp'
  | 'currency'
  | 'text';

export type InputMode = 'nude' | 'normal';

export interface InputProps {
  value?: string;
  label?: string;
  placeholder?: string;
  variant?: InputVariant;
  type?: InputType;
  mode?: InputMode;
  isHugWidth?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  maxLength?: number;
  onChange?(text: string): void;
}
