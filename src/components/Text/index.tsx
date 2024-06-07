import { TextProps } from '../../@types';
import {
  textColors,
  textDisplays,
  textHoverColors,
  textSizes,
  textWeights,
} from '../../constants';

export function Text(props: TextProps) {
  const {
    children,
    type = 'regular',
    color = 'text',
    size = 'base',
    display = 'block',
    toCenter = false,
    hoverColor = color,
    isCursorPointer = false,
    className,
    onClick,
  } = props;

  const textAlign = `text-${toCenter ? 'center' : 'left'}`;
  const cursor = isCursorPointer ? 'cursor-pointer' : '';

  return (
    <p
      className={`${textDisplays[display]} ${textColors[color]} ${textWeights[type]} ${textSizes[size]} ${textAlign} ${textHoverColors[hoverColor]} ${cursor} ${className}`}
      onClick={onClick}
    >
      {children}
    </p>
  );
}