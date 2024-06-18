import { IconProps } from '../../@types';

export const iconColors: Record<Required<IconProps>['color'], string> = {
  white: '#fff',
  white90: '#ffffffe6',
  white60: '#ffffff99',
  text: '#252527',
  text85: '#252527d9',
  text50: '#25252780',
  'background-color': '#F2E9E4',
  primary: '#AA906B',
  primary60: '#aa906b99',
  alert: '#FB4D3D',
  warning: '#E7BB41',
};

export const iconSizes: Record<Required<IconProps>['size'], string> = {
  tiny: '1rem',
  'xx-small': '1.25rem',
  'x-small': '1.5rem',
  small: '1.75rem',
  medium: '2rem',
};
