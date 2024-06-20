interface ImageProps {
  id: string;
  name: string;
  uri: string;
}

export interface Banner {
  id: string;
  title: string;
  description: string;
  image: ImageProps
}
