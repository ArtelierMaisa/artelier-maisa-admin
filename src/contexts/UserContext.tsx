import { get, ref } from 'firebase/database';
import { createContext, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

import { About, UserContextProps } from '../@types';
import { database } from '../services';

// TODO: Create type to UserContext in @types/contexts.
export const UserContext = createContext({} as UserContextProps);

// TODO: Create the data user logic. Add all requests and states this context.

export function UserProvider({ children }: Required<PropsWithChildren>) {
  const [about, setAbout] = useState({} as About);

  async function handleGetAbout(): Promise<void> {
    const aboutRef = ref(database, 'about');
    const aboutSnapshot = await get(aboutRef);

    if (!aboutSnapshot.exists()) {
      toast.error(
        'Falha ao buscar suas informações! Algo deu errado durante a busca de informações. Por favor, tente novamente. Se o problema persistir, entre em contato com o suporte técnico.',
        {
          duration: 7500,
        },
      );

      return;
    }

    const aboutFirebase: About = Object.keys(aboutSnapshot.val()).map(key => ({
      ...aboutSnapshot.val()[key],
      id: key,
    }))[0];

    if (!aboutFirebase) {
      toast.error(
        'Falha ao buscar suas informações! Algo deu errado durante a busca de informações. Por favor, tente novamente. Se o problema persistir, entre em contato com o suporte técnico.',
        {
          duration: 7500,
        },
      );

      return;
    }

    setAbout(aboutFirebase);
  }

  return (
    <UserContext.Provider value={{ handleGetAbout, about }}>
      {children}
    </UserContext.Provider>
  );
}
