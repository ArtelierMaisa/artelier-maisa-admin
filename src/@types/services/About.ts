export interface About {
  id: string;
  name: string;
  description: string;
  additional: string;
  uri: string;
}

export type AboutEdit = Omit<About, 'uri'> & {
  file: File;
};
