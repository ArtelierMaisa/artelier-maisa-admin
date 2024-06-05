import { DotButtonProps, IconProps } from '../../@types';
import { dotButtonIconSizes, dotButtonSizes } from '../../constants';
import { Icon } from '../Icon';

export function DotButton(props: DotButtonProps) {
  const { onClick, type = 'add', variant = 'medium' } = props;

  const commonIconProps: Omit<IconProps, 'variant'> = {
    color: 'white',
    size: dotButtonIconSizes[variant],
    isCursorPointer: true,
  };

  const dotButtonIcons: Record<Required<DotButtonProps>['type'], JSX.Element> =
    {
      add: <Icon variant='plus' {...commonIconProps} />,
      next: <Icon variant='caret-right' {...commonIconProps} />,
      previous: <Icon variant='caret-left' {...commonIconProps} />,
    };

  return (
    <button
      type='button'
      onClick={onClick}
      className={`flex ${dotButtonSizes[variant]} justify-center items-center cursor-pointer bg-primary rounded-full hover:opacity-90 transition-colors duration-300`}
    >
      {dotButtonIcons[type]}
    </button>
  );
}
