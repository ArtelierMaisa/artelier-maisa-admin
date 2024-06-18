import { Spinner as FlowbiteSpinner } from 'flowbite-react';

import { SpinnerProps } from '../../@types';
import { spinnerSizes } from '../../constants';

export function Spinner(props: SpinnerProps) {
  const { size = 'medium', color = 'primary' } = props;

  return (
    <FlowbiteSpinner
      aria-label='Loading...'
      color={color}
      size={spinnerSizes[size]}
    />
  );
}
