export type SpinnerSize = 'small' | 'medium' | 'large';

export type SpinnerColor = 'primary' | 'primary60' | 'white' | 'white60';

export interface SpinnerProps {
  color?: SpinnerColor;
  size?: SpinnerSize;
}