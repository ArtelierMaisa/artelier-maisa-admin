import { DotButtonProps, IconSize } from '../../@types';

export const dotButtonSizes: Record<
  Required<DotButtonProps>['variant'],
  string
> = {
  'x-small': 'w-6 h-6',
  small: 'w-8 h-8',
  medium: 'w-12 h-12',
};

export const dotButtonIconSizes: Record<
  Required<DotButtonProps>['variant'],
  IconSize
> = {
  'x-small': 'tiny',
  small: 'x-small',
  medium: 'medium',
};
