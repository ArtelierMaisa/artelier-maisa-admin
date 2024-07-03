import { memo } from 'react';

import { TextProps } from '../../@types';
import {
  textColors,
  textDisplays,
  textHoverColors,
  textSizes,
  textWeights,
} from '../../constants';

function Text(props: TextProps) {
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
  } = props;

  const textAlign = `text-${toCenter ? 'center' : 'left'}`;
  const cursor = isCursorPointer ? 'cursor-pointer' : '';

  return (
    <p
      className={`${textDisplays[display]} ${textColors[color]} ${textWeights[type]} ${textSizes[size]} ${textAlign} ${textHoverColors[hoverColor]} ${cursor} ${className}`}
    >
      {children}
    </p>
  );
}

export default memo(Text);
