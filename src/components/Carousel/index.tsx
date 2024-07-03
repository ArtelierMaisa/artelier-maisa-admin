import { Carousel as FlowbiteCarousel } from 'flowbite-react';
import { memo } from 'react';

import { CarouselProps, DotButtonProps } from '../../@types';
import { DotButton } from '../';

function Carousel(props: CarouselProps) {
  const { images = [], isDisabled = false } = props;

  const display = isDisabled
    ? 'absolute flex top-0 left-0 cursor-not-allowed'
    : 'hidden';

  const commonDotButtonProps: DotButtonProps = {
    variant: 'x-small',
    mode: 'figure',
  };

  const existingImages = images.filter(image => !!image?.id);
  const hasOneImage = existingImages.length === 1;

  const rightControl: React.JSX.Element = hasOneImage ? (
    <span />
  ) : (
    <DotButton type='next' {...commonDotButtonProps} />
  );
  const leftControl: React.JSX.Element = hasOneImage ? (
    <span />
  ) : (
    <DotButton type='previous' {...commonDotButtonProps} />
  );

  return (
    <div className='relative w-full max-w-80 h-56'>
      <div
        className={`${display} z-20 w-full h-full bg-white opacity-40 rounded-t-lg`}
      />

      <FlowbiteCarousel
        slide={false}
        indicators={false}
        rightControl={rightControl}
        leftControl={leftControl}
      >
        {existingImages.map(image => (
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

export default memo(Carousel);
