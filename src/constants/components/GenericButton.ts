import { GenericButtonProps } from '../../@types';

export const genericButtonHeights: Record<
  Required<GenericButtonProps>['type'],
  string
> = {
  medium: 'h-16',
  small: 'h-12',
};