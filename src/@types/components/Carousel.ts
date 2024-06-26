export interface CarouselImageProps {
  id: string;
  name: string;
  uri: string;
}

export interface CarouselProps {
  images?: [
    CarouselImageProps,
    CarouselImageProps?,
    CarouselImageProps?,
    CarouselImageProps?,
  ];
  isDisabled?: boolean;
}
