export type InputVariant =
  | 'input'
  | 'input-currency'
  | 'input-whatsapp'
  | 'textarea';

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
  id?: string;
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
