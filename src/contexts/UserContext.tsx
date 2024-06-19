import { createContext, PropsWithChildren } from 'react';

import { UserContextProps } from '../@types';

// TODO: Create type to UserContext in @types/contexts.
export const UserContext = createContext({} as UserContextProps);

// TODO: Create the data user logic. Add all requests and states this context.
export function UserProvider({ children }: Required<PropsWithChildren>) {
  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
}
