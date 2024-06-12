import { useState } from 'react';

import { IconProps, ProductProps } from '../../@types';
import { Carousel, Icon, Switch, Text } from '../';

export function Product(props: ProductProps) {
  const { id, images, name, isOccult, onDelete, onUpdate } = props;

  const [isChecked, setIsChecked] = useState<boolean>(isOccult);

  const commonIconProps: Omit<IconProps, 'variant'> = {
    size: 'medium',
    color: 'primary',
  };

  return (
    <div className='flex flex-col w-80 h-80 rounded-lg ring-1 ring-primary'>
      <Carousel images={images} isDisabled={!isChecked} />

      <div className='flex flex-col w-full h-auto justify-center items-center p-2 gap-2'>
        <Text
          type='semibold'
          color={!isChecked ? 'primary60' : 'primary'}
          toCenter
        >
          {name}
        </Text>

        <div className='flex flex-1 flex-row w-full justify-between items-center gap-1'>
          <button
            type='button'
            className='w-auto h-auto cursor-pointer hover:opacity-85 transition-opacity duration-200'
            onClick={() => onUpdate && onUpdate(id)}
          >
            <Icon variant='pencil' {...commonIconProps} />
          </button>

          <Switch checked={isChecked} variant='eyes' onToggle={setIsChecked} />

          <button
            type='button'
            className='w-auto h-auto cursor-pointer hover:opacity-85 transition-opacity duration-200'
            onClick={() => onDelete && onDelete(id)}
          >
            <Icon variant='trash' {...commonIconProps} />
          </button>
        </div>
      </div>
    </div>
  );
}
