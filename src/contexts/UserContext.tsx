import { get, ref, remove } from 'firebase/database';
import { deleteObject, ref as refStorage } from 'firebase/storage';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { toast } from 'sonner';

import {
  About,
  Banner,
  Categories,
  Highlight,
  UserContextProps,
} from '../@types';
import { categoryMapper, mapper } from '../helpers/firebase';
import { useAuth } from '../hooks';
import { database, storage } from '../services';

// TODO: Create type to UserContext in @types/contexts.
export const UserContext = createContext({} as UserContextProps);

// TODO: Create the data user logic. Add all requests and states this context.
export function UserProvider({ children }: Required<PropsWithChildren>) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [about, setAbout] = useState<About>({} as About);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);

  const { isAuthenticated } = useAuth();

  const handleGenericErrorToast = useCallback(() => {
    toast.error(
      'Falha ao buscar suas informações! Algo deu errado durante a busca de informações. Por favor, tente novamente. Se o problema persistir, entre em contato com o suporte técnico.',
      { duration: 7500 },
    );
  }, []);

  function isGreaterThanPeriodRemove(highlight: Highlight): boolean {
    const currentTime = new Date().getTime();
    return currentTime > highlight.removedAt;
  }

  const handleGetAbout = useCallback(async () => {
    const aboutRef = ref(database, 'about');
    const aboutSnapshot = await get(aboutRef);
    if (!aboutSnapshot.exists()) return handleGenericErrorToast();

    const aboutFirebase = mapper<About[]>(aboutSnapshot)[0];
    if (!aboutFirebase) return handleGenericErrorToast();

    setAbout(aboutFirebase);
  }, [handleGenericErrorToast]);

  const handleGetHighlights = useCallback(async () => {
    const highlightsRef = ref(database, 'highlights');
    const highlightsSnapshot = await get(highlightsRef);
    if (!highlightsSnapshot.exists()) return setHighlights([]);

    const highlightsFirebase = mapper<Highlight[]>(highlightsSnapshot);
    if (!highlightsFirebase) return handleGenericErrorToast();

    // TODO -> REMOVE HIGHLIGHTS IMAGES FROM FIREBASE STORAGE
    highlightsFirebase.forEach(async highlight => {
      if (isGreaterThanPeriodRemove(highlight)) {
        const highlightRef = ref(database, `highlights/${highlight.id}`);
        remove(highlightRef);
      }
    });

    const highlightsInPeriod = highlightsFirebase.filter(
      highlight => !isGreaterThanPeriodRemove(highlight),
    );

    setHighlights(highlightsInPeriod);
  }, [handleGenericErrorToast]);

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

  const handleGetBanners = useCallback(async () => {
    const bannersRef = ref(database, 'banners');
    const bannersSnapshot = await get(bannersRef);
    if (!bannersSnapshot.exists()) return setBanners([]);

    const bannersFirebase = mapper<Banner[]>(bannersSnapshot);
    if (!bannersFirebase) return handleGenericErrorToast();

    setBanners(bannersFirebase);
  }, [handleGenericErrorToast]);

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

  const handleGetCategories = useCallback(async () => {
    const categoriesRef = ref(database, 'categories');
    const categoriesSnapshot = await get(categoriesRef);
    if (!categoriesSnapshot.exists()) return setCategories([]);

    const categoriesFirebase = categoryMapper<Categories[]>(categoriesSnapshot);
    if (!categoriesFirebase) return handleGenericErrorToast();

    setCategories(categoriesFirebase);
  }, [handleGenericErrorToast]);

  const fetchFirebase = useCallback(async () => {
    await handleGetBanners();
    await handleGetCategories();
    await handleGetHighlights();
    await handleGetAbout();

    setIsLoaded(true);
  }, [
    handleGetAbout,
    handleGetBanners,
    handleGetCategories,
    handleGetHighlights,
  ]);

  useEffect(() => {
    if (isAuthenticated) fetchFirebase();
  }, [isAuthenticated, fetchFirebase]);

  return (
    <UserContext.Provider
      value={{
        about,
        highlights,
        banners,
        categories,
        isLoaded,
        handleGetAbout,
        handleGetHighlights,
        handleGetBanners,
        handleDeleteHighlight,
        handleDeleteBanner,
        handleGetCategories,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
