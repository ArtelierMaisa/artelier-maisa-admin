import { InputType } from '../../@types';

export const textInputTypes: Record<InputType, React.HTMLInputTypeAttribute> = {
  currency: 'number',
  email: 'email',
  material: 'text',
  password: 'password',
  size: 'text',
  text: 'text',
  weight: 'number',
  whatsapp: 'text',
};
