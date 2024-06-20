import { createContext, PropsWithChildren, useState } from 'react';

import { About, UserContextProps } from '../@types';
import { ref, get } from 'firebase/database';
import { database } from '../services';
import { ExternalToast, toast } from 'sonner';

// TODO: Create type to UserContext in @types/contexts.
export const UserContext = createContext({} as UserContextProps);

// TODO: Create the data user logic. Add all requests and states this context.

export function UserProvider({ children }: Required<PropsWithChildren>) {
  const [about, setAbout] = useState({} as About);
  const toastOptions: ExternalToast = { duration: 7500 };


  function handleGenericErrorToast(): void {
    toast.error(
      'Falha ao buscar suas informações! Algo deu errado durante a busca de informações. Por favor, tente novamente. Se o problema persistir, entre em contato com o suporte técnico.',
      toastOptions
    );
  }

  async function handleGetAbout(): Promise<void> {
    const aboutRef = ref(database, 'about');
    const aboutSnapshot = await get(aboutRef);

    if (!aboutSnapshot.exists()) return handleGenericErrorToast();


    const aboutFirebase: About = Object.keys(aboutSnapshot.val()).map(key => ({
      ...aboutSnapshot.val()[key],
      id: key,
    }))[0]

    if (!aboutFirebase) return handleGenericErrorToast();


    setAbout(aboutFirebase);
  }

  return <UserContext.Provider value={{ handleGetAbout, about }}>{children}</UserContext.Provider>;
}


