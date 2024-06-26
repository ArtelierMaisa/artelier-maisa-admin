export interface CarouselImageProps {
  id: string;
  name: string;
  uri: string;
}

export interface CarouselProps {
  images?: CarouselImageProps[];
  isDisabled?: boolean;
}
