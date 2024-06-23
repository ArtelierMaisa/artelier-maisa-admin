import { get, ref, remove } from 'firebase/database';
import { createContext, PropsWithChildren, useState } from 'react';
import { ExternalToast, toast } from 'sonner';
import { deleteObject, ref as refStorage } from 'firebase/storage';
import {
  About,
  Banner,
  Categories,
  Highlight,
  UserContextProps,
} from '../@types';
import { mapper } from '../helpers/firebase';
import { database, storage } from '../services';

// TODO: Create type to UserContext in @types/contexts.
export const UserContext = createContext({} as UserContextProps);

// TODO: Create the data user logic. Add all requests and states this context.
export function UserProvider({ children }: Required<PropsWithChildren>) {
  const [about, setAbout] = useState({} as About);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const toastOptions: ExternalToast = { duration: 7500 };

  function handleGenericErrorToast(): void {
    toast.error(
      'Falha ao buscar suas informações! Algo deu errado durante a busca de informações. Por favor, tente novamente. Se o problema persistir, entre em contato com o suporte técnico.',
      toastOptions,
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

    const aboutFirebase = mapper<About[]>(aboutSnapshot)[0];

    if (!aboutFirebase) return handleGenericErrorToast();

    setAbout(aboutFirebase);
  }

  async function handleGetHighlights(): Promise<void> {
    const highlightsRef = ref(database, 'highlights');
    const highlightsSnapshot = await get(highlightsRef);

    if (!highlightsSnapshot.exists()) return setHighlights([]);

    const highlightsFirebase = mapper<Highlight[]>(highlightsSnapshot);

    if (!highlightsFirebase) return handleGenericErrorToast();

    // TODO -> REMOVE HIGHLIGHTS IMAGES FROM FIREBASE STORAGE
    highlightsFirebase.forEach(async hightlight => {
      if (isGreaterThanPeriodRemove(hightlight)) {
        const highlightRef = ref(database, `highlights/${hightlight.id}`);
        remove(highlightRef);
      }
    });

    const highlightsInPeriod = highlightsFirebase.filter(
      highlight => !isGreaterThanPeriodRemove(highlight),
    );

    setHighlights(highlightsInPeriod);
  }

  async function handleDeleteHighlight(id: string): Promise<void> {
    const highlightRef = ref(database, `highlights/${id}`);
    const highlightSnapshot = await get(highlightRef);

    if (!highlightSnapshot.exists()) return handleGenericErrorToast();

    const highlight: Highlight = highlightSnapshot.val();

    const imageName = highlight.image.name;
    const imageRef = refStorage(storage, `images/${imageName}`);

    if (!imageRef) return handleGenericErrorToast();

    deleteObject(imageRef).catch(() => handleGenericErrorToast());

    await remove(highlightRef);
    handleGetHighlights();
  }

  async function handleGetBanners(): Promise<void> {
    const bannersRef = ref(database, 'banners');
    const bannersSnapshot = await get(bannersRef);

    if (!bannersSnapshot.exists()) return handleGenericErrorToast();

    const bannersFirebase = mapper<Banner[]>(bannersSnapshot);

    if (!bannersFirebase) return handleGenericErrorToast();

    setBanners(bannersFirebase);
  }

  async function handleDeleteBanner(id: string): Promise<void> {
    const bannerRef = ref(database, `banners/${id}`);
    const bannerSnapshot = await get(bannerRef);

    if (!bannerSnapshot.exists()) return handleGenericErrorToast();

    const banner: Banner = bannerSnapshot.val();

    const imageName = banner.image.name;
    const imageRef = refStorage(storage, `images/${imageName}`);

    if (!imageRef) return handleGenericErrorToast();

    deleteObject(imageRef).catch(() => handleGenericErrorToast());

    await remove(bannerRef);
    handleGetBanners();
  }

  async function handleGetCategories(): Promise<void> {
    const categoriesRef = ref(database, 'categories');
    const categoriesSnapshot = await get(categoriesRef);

    if (!categoriesSnapshot.exists()) return handleGenericErrorToast();

    const categoriesFirebase = mapper<Categories[]>(categoriesSnapshot);

    if (!categoriesFirebase) return handleGenericErrorToast();
    setCategories(categoriesFirebase);
    console.log(categoriesFirebase);
  }

  return (
    <UserContext.Provider
      value={{
        handleGetAbout,
        handleGetHighlights,
        handleGetBanners,
        handleDeleteHighlight,
        handleDeleteBanner,
        handleGetCategories,
        about,
        highlights,
        banners,
        categories,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
