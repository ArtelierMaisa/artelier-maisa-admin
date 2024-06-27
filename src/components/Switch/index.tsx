import { useState } from 'react';

import { SwitchProps } from '../../@types';
import { Icon } from '../';

export function Switch(props: SwitchProps) {
  const {
    checked,
    htmlFor,
    variant = 'eyes',
    isDisabled = false,
    onToggle,
  } = props;

  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const backgroundColorDisabled = isDisabled ? 'bg-primary60' : 'bg-primary';
  const cursor = isDisabled ? 'cursor-not-allowed' : 'cursor-pointer';
  const animateSwitch = isChecked ? 'translate-x-0' : 'translate-x-full';
  const iconVariant = isChecked ? 'eye-slash' : 'eye';

  function handleToggle(): void {
    if (onToggle) onToggle(!isChecked);
    setIsChecked(!isChecked);
  }

  return (
    <div className='relative rounded-full w-16 h-8 transition duration-300 linear'>
      <label
        htmlFor={htmlFor}
        aria-disabled={isDisabled}
        className={`absolute left-0 flex w-8 h-8 justify-center items-center appearance-none ${backgroundColorDisabled} rounded-full transition transform duration-300 linear ${cursor} ${animateSwitch}`}
      >
        {variant === 'eyes' && (
          <Icon
            variant={iconVariant}
            size='xx-small'
            color='background-color'
          />
        )}
      </label>

      <input
        type='checkbox'
        id={htmlFor}
        className='w-full h-full appearance-none ring-1 ring-primary rounded-full bg-background-color border-none form-checkbox cursor-pointer active:outline-none focus:text-background-color focus:ring-offset-0 focus:outline-none focus:ring focus:ring-primary60 focus:border-primary60 checked:bg-none checked:bg-background-color disabled:ring-primary60 disabled:cursor-not-allowed'
        checked={isChecked}
        aria-checked={isChecked}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        readOnly
        onClick={handleToggle}
      />
    </div>
  );
}
