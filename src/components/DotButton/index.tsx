import { DotButtonMode, DotButtonProps, IconProps } from '../../@types';
import { dotButtonIconSizes, dotButtonSizes } from '../../constants';
import { Icon } from '../Icon';

export function DotButton(props: DotButtonProps) {
  const { type = 'add', variant = 'medium', mode = 'button', onClick } = props;

  const commonIconProps: Omit<IconProps, 'variant'> = {
    color: 'white',
    size: dotButtonIconSizes[variant],
    isCursorPointer: true,
  };

  const dotButtonIcons: Record<
    Required<DotButtonProps>['type'],
    React.JSX.Element
  > = {
    add: <Icon variant='plus' {...commonIconProps} />,
    next: <Icon variant='caret-right' {...commonIconProps} />,
    previous: <Icon variant='caret-left' {...commonIconProps} />,
    pencil: <Icon variant='pencil' {...commonIconProps} />,
  };

  const dotButtonModes: Record<DotButtonMode, React.JSX.Element> = {
    button: (
      <button
        type='button'
        onClick={onClick}
        className={`flex ${dotButtonSizes[variant]} justify-center items-center cursor-pointer bg-primary rounded-full hover:opacity-90 transition-colors duration-300 focus:outline-none focus:ring focus:ring-primary60 focus:border-primary60`}
      >
        {dotButtonIcons[type]}
      </button>
    ),
    figure: (
      <div
        className={`flex ${dotButtonSizes[variant]} justify-center items-center bg-primary rounded-full`}
      >
        {dotButtonIcons[type]}
      </div>
    ),
  };

  return dotButtonModes[mode];
}
