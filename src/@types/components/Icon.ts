import { Colors } from '../global';

export type IconVariant =
  | 'plus'
  | 'pencil'
  | 'magnifying-glass'
  | 'caret-right'
  | 'caret-left'
  | 'whatsapp-logo'
  | 'x'
  | 'info'
  | 'trash'
  | 'image'
  | 'shopping-cart'
  | 'palette'
  | 'address-book-tabs'
  | 'sign-out'
  | 'list'
  | 'eye'
  | 'eye-slash';

export type IconSize = 'tiny' | 'xx-small' | 'x-small' | 'small' | 'medium';

export interface IconProps {
  variant: IconVariant;
  color?: Colors;
  size?: IconSize;
  isCursorPointer?: boolean;
  onClick?(): void;
}
