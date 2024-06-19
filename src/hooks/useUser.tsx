import { useContext } from 'react';

import { UserContextProps } from '../@types';
import { UserContext } from '../contexts';

export function useUser(): UserContextProps {
  return useContext(UserContext);
}
