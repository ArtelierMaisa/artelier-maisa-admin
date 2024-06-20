import { createContext, PropsWithChildren, useState } from 'react';
import { ExternalToast, toast } from 'sonner';
import { ref, get, remove } from 'firebase/database';
import { About, Highlight, UserContextProps } from '../@types';
import { database } from '../services';

// TODO: Create type to UserContext in @types/contexts.
export const UserContext = createContext({} as UserContextProps);

// TODO: Create the data user logic. Add all requests and states this context.

export function UserProvider({ children }: Required<PropsWithChildren>) {
  const [about, setAbout] = useState({} as About);
  const [highlights, setHighlights] = useState([] as Highlight[]);
  const toastOptions: ExternalToast = { duration: 7500 };


  function handleGenericErrorToast(): void {
    toast.error(
      'Falha ao buscar suas informações! Algo deu errado durante a busca de informações. Por favor, tente novamente. Se o problema persistir, entre em contato com o suporte técnico.',
      toastOptions
    );
  }

  function isGreaterThanPeriodRemove(highlight: Highlight): boolean {
    const currentTime = new Date().getTime();
    return currentTime > highlight.removedAt;
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

  async function handleGetHighlights(): Promise<void> {
    const highlightsRef = ref(database, 'highlights');
    const highlightsSnapshot = await get(highlightsRef);

    if (!highlightsSnapshot.exists()) return setHighlights([]);

    const highlightsFirebase: Highlight[] = Object.keys(highlightsSnapshot.val()).map(key => ({
      ...highlightsSnapshot.val()[key],
      id: key,
    }));

    if (!highlightsFirebase) return handleGenericErrorToast();

    // TODO -> REMOVE HIGHLIGHTS IMAGES FROM FIREBASE STORAGE
    highlightsFirebase.forEach(async (hightlight) => {
      if (isGreaterThanPeriodRemove(hightlight)) {
        const highlightRef = ref(database, `highlights/${hightlight.id}`);
        remove(highlightRef);
      }
    })

    const highlightsInPeriod = highlightsFirebase.filter(highlight => !isGreaterThanPeriodRemove(highlight));

    setHighlights(highlightsInPeriod);
  }

  return <UserContext.Provider value={{ handleGetAbout, handleGetHighlights, about, highlights }}>{children}</UserContext.Provider>;
}


