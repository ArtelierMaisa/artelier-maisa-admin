import { ChangeEvent } from 'react';

export interface SearchInputProps {
  searchValue?: string;
  onChange?(event: ChangeEvent<HTMLInputElement>): void;
  onSearch?(): void;
}
