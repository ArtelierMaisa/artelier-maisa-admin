import { useState } from 'react';

import { IconProps, ProductProps } from '../../@types';
import { Carousel, DotButton, Icon, Switch, Text } from '../';

export function Product(props: ProductProps) {
  const {
    variant = 'blank',
    images = [],
    id = '',
    name = '',
    isOccult = false,
    onAdd,
    onDelete,
    onUpdate,
  } = props;

  const [isChecked, setIsChecked] = useState<boolean>(isOccult);

  const isFilled = variant === 'fill';

  const commonIconProps: Omit<IconProps, 'variant'> = {
    size: 'medium',
    color: 'primary',
  };

  return (
    <div className='flex flex-col w-64 min-w-64 sm:w-80 sm:min-w-80 h-64 sm:min-h-[19rem] rounded-lg ring-1 ring-primary bg-background-color'>
      {isFilled ? (
        <>
          <Carousel
            images={images.length ? images : undefined}
            isDisabled={isChecked}
          />

          <div className='flex flex-col h-auto justify-center items-center p-2 gap-1 sm:gap-2 overflow-hidden'>
            <Text
              type='semibold'
              color={isChecked ? 'primary60' : 'primary'}
              toCenter
            >
              {name}
            </Text>

            <div className='flex flex-1 flex-row w-full justify-between items-center gap-1'>
              <button
                type='button'
                className='w-auto h-auto rounded-lg cursor-pointer hover:opacity-85 transition-opacity duration-200 focus:outline-none focus:ring focus:ring-primary60 focus:border-primary60'
                onClick={() => onUpdate && onUpdate(id)}
              >
                <Icon variant='pencil' {...commonIconProps} />
              </button>

              <Switch
                checked={isChecked}
                variant='eyes'
                onToggle={setIsChecked}
              />

              <button
                type='button'
                className='w-auto h-auto rounded-lg cursor-pointer hover:opacity-85 transition-opacity duration-200 focus:outline-none focus:ring focus:ring-primary60 focus:border-primary60'
                onClick={() => onDelete && onDelete(id)}
              >
                <Icon variant='trash' {...commonIconProps} />
              </button>
            </div>
          </div>
        </>
      ) : (
        <button
          type='button'
          className='flex flex-col w-full h-full justify-center items-center rounded-lg p-2 gap-2 hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring focus:ring-primary60 focus:border-primary60'
          onClick={onAdd}
        >
          <DotButton type='add' mode='figure' variant='medium' />

          <Text type='semibold' color='primary' toCenter>
            Clique para cadastrar o produto
          </Text>
        </button>
      )}
    </div>
  );
}
