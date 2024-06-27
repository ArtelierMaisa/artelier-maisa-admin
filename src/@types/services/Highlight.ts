interface ImageProps {
  id: string;
  name: string;
  uri: string;
}

export interface Highlight {
  id: string;
  title: string;
  description: string;
  image: ImageProps;
  createdAt: number;
  removedAt: number;
}

export type HighlightEdit = Omit<Highlight, 'createdAt' | 'removedAt'> & {
  file: File | null;
};
