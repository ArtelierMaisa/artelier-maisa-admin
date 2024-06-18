import { textSizes, textWeights } from '../../constants';
import { Colors } from '../global';

export type DisplayTextType = 'block' | 'inline' | 'inline-flex';

export interface TextProps {
  children: React.ReactNode;
  type?: keyof typeof textWeights;
  color?: Colors;
  size?: keyof typeof textSizes;
  toCenter?: boolean;
  display?: DisplayTextType;
  hoverColor?: Colors;
  isCursorPointer?: boolean;
  className?: string;
}
