import { TextProps } from '../../@types';

export const textColors: Record<Required<TextProps>['color'], string> = {
  white: 'text-white',
  white90: 'text-white90',
  white60: 'text-white60',
  text: 'text-text',
  text85: 'text-text85',
  text50: 'text-text50',
  'background-color': 'text-background-color',
  primary: 'text-primary',
  primary60: 'text-primary60',
  alert: 'text-alert',
  warning: 'text-warning',
};

export const textHoverColors: Record<Required<TextProps>['color'], string> = {
  white: 'hover:text-white',
  white90: 'hover:text-white90',
  white60: 'hover:text-white60',
  text: 'hover:text-text',
  text85: 'hover:text-text85',
  text50: 'hover:text-text50',
  'background-color': 'hover:text-background-color',
  primary: 'hover:text-primary',
  primary60: 'hover:text-primary60',
  alert: 'hover:text-alert',
  warning: 'hover:text-warning',
};

export const textWeights = {
  regular: 'font-regular',
  medium: 'font-medium',
  bold: 'font-bold',
  semibold: 'font-semibold',
};

export const textSizes = {
  sm: 'text-sm',
  base: 'text-base',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
};

export const textDisplays: Record<Required<TextProps>['display'], string> = {
  'inline-flex': 'inline-flex',
  block: 'block',
  inline: 'inline',
};