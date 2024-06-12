import { Carousel as FlowbiteCarousel } from 'flowbite-react';

import { CarouselProps } from '../../@types';
import { DotButton } from '../';

export function Carousel(props: CarouselProps) {
  const { images = [], isDisabled = false } = props;

  const display = isDisabled
    ? 'absolute flex top-0 left-0 cursor-not-allowed'
    : 'hidden';

  return (
    <div className='relative w-full max-w-80 h-56'>
      <div className={`${display} z-20 w-full h-full bg-white opacity-40`} />

      <FlowbiteCarousel
        slide={false}
        indicators={false}
        rightControl={<DotButton type='next' variant='x-small' mode='figure' />}
        leftControl={
          <DotButton type='previous' variant='x-small' mode='figure' />
        }
      >
        {images.map(image => (
          <img
            key={image.id}
            src={image.uri}
            alt={`Imagem do ${image.name}`}
            className='w-full h-full max-w-full rounded-none object-cover'
          />
        ))}
      </FlowbiteCarousel>
    </div>
  );
}
