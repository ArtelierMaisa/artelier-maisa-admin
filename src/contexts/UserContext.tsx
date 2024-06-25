import { get, ref, remove, set } from 'firebase/database';
import {
  deleteObject,
  getDownloadURL,
  ref as refStorage,
  StorageError,
  uploadBytesResumable,
} from 'firebase/storage';
import { nanoid } from 'nanoid';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ExternalToast, toast } from 'sonner';

import {
  About,
  AboutEdit,
  Banner,
  Categories,
  Highlight,
  UserContextProps,
} from '../@types';
import { categoryMapper, mapper, productMapper } from '../helpers';
import { useAuth } from '../hooks';
import { database, storage } from '../services';

export const UserContext = createContext({} as UserContextProps);

export function UserProvider({ children }: Required<PropsWithChildren>) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [about, setAbout] = useState<About>({} as About);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);

  const { isAuthenticated } = useAuth();

  const toastOptions: ExternalToast = useMemo(() => ({ duration: 7500 }), []);

  const handleGetErrorToast = useCallback(() => {
    toast.error(
      'Falha ao buscar as informações! Algo deu errado durante a busca de informações. Por favor, tente novamente. Se o problema persistir, entre em contato com o suporte técnico.',
      toastOptions,
    );
  }, [toastOptions]);

  function handleEditErrorToast(): void {
    toast.error(
      'Falha ao editar as informações! Algo deu errado ao editar as informações. Por favor, tente novamente. Se o problema persistir, entre em contato com o suporte técnico.',
      toastOptions,
    );
  }

  function handleDeleteErrorToast(): void {
    toast.error(
      'Falha ao deletar as informações! Algo deu errado ao deletar as informações. Por favor, tente novamente. Se o problema persistir, entre em contato com o suporte técnico.',
      toastOptions,
    );
  }

  function handleUpdateFileErrorToast(error: StorageError): void {
    switch (error.code) {
      case 'storage/unauthorized':
        toast.error(
          'Acesso negado! Você precisa de permissões adicionais para atualizar o conteúdo.',
          toastOptions,
        );
        break;
      case 'storage/canceled':
        toast.error(
          'Ocorreu um erro. A ação foi cancelada antes de ser concluída.',
          toastOptions,
        );
        break;
      case 'storage/unknown':
        toast.error(
          'Ocorreu um erro desconhecido. Por favor, tente novamente mais tarde.',
          toastOptions,
        );
        break;
    }
  }

  function isGreaterThanPeriodRemove(highlight: Highlight): boolean {
    const currentTime = new Date().getTime();
    return currentTime > highlight.removedAt;
  }

  const handleGetAbout = useCallback(async () => {
    const aboutRef = ref(database, 'about');
    const aboutSnapshot = await get(aboutRef);
    if (!aboutSnapshot.exists()) {
      setAbout({} as About);
      return handleGetErrorToast();
    }

    const aboutFirebase = mapper<About[]>(aboutSnapshot)[0];
    if (!aboutFirebase) return handleGetErrorToast();

    setAbout(aboutFirebase);
  }, [handleGetErrorToast]);

  async function handlePutAbout(newAbout: AboutEdit): Promise<void> {
    const aboutRef = ref(database, 'about');
    const aboutSnapshot = await get(aboutRef);

    if (!aboutSnapshot.exists()) return handleEditErrorToast();

    const storageRef = refStorage(storage, `images/${newAbout.id}`);
    const uploadTask = uploadBytesResumable(storageRef, newAbout.file);

    uploadTask.on(
      'state_changed',
      () => {},
      handleUpdateFileErrorToast,
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(uri => {
            const commonAboutProps = {
              name: newAbout.name,
              description: newAbout.description,
              additional: newAbout.additional,
              uri,
            };
            set(ref(database, `about/${newAbout.id}`), commonAboutProps).catch(
              handleEditErrorToast,
            );
            setAbout({ ...about, ...commonAboutProps });
          })
          .catch(handleEditErrorToast);
      },
    );
  }

  const handleGetHighlights = useCallback(async () => {
    const highlightsRef = ref(database, 'highlights');
    const highlightsSnapshot = await get(highlightsRef);
    if (!highlightsSnapshot.exists()) return setHighlights([]);

    const highlightsFirebase = mapper<Highlight[]>(highlightsSnapshot);
    if (!highlightsFirebase) return handleGetErrorToast();

    highlightsFirebase.forEach(async highlight => {
      if (isGreaterThanPeriodRemove(highlight)) {
        await handleDeleteHighlight(highlight.id);
      }
    });

    const highlightsInPeriod = highlightsFirebase.filter(
      highlight => !isGreaterThanPeriodRemove(highlight),
    );

    setHighlights(highlightsInPeriod);
  }, [handleGetErrorToast]);

  async function handleDeleteHighlight(id: string): Promise<void> {
    const highlightRef = ref(database, `highlights/${id}`);
    const highlightSnapshot = await get(highlightRef);
    if (!highlightSnapshot.exists()) return handleDeleteErrorToast();

    const highlight: Highlight = highlightSnapshot.val();

    const imageId = highlight.image.id;
    const imageRef = refStorage(storage, `images/${imageId}`);
    if (!imageRef) return handleDeleteErrorToast();

    deleteObject(imageRef).catch(handleDeleteErrorToast);

    await remove(highlightRef);
    await handleGetHighlights();
  }

  const handleGetBanners = useCallback(async () => {
    const bannersRef = ref(database, 'banners');
    const bannersSnapshot = await get(bannersRef);
    if (!bannersSnapshot.exists()) return setBanners([]);

    const bannersFirebase = mapper<Banner[]>(bannersSnapshot);
    if (!bannersFirebase) return handleGetErrorToast();

    setBanners(bannersFirebase);
  }, [handleGetErrorToast]);

  async function handleCreateBanner(file: File): Promise<void> {
    const bannerRef = ref(database, 'banners');
    const bannerSnapshot = await get(bannerRef);

    if (!bannerSnapshot.exists()) return handleEditErrorToast();

    const bannerId = nanoid();
    const imageId = nanoid();

    const storageRef = refStorage(storage, `images/${imageId}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      () => {},
      handleUpdateFileErrorToast,
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(uri => {
            const commonBannerProps = {
              image: {
                id: imageId,
                name: file.name,
                uri,
              },
            };
            set(ref(database, `banners/${bannerId}`), commonBannerProps).catch(
              handleEditErrorToast,
            );
            handleGetBanners();
          })
          .catch(handleEditErrorToast);
      },
    );
  }

  async function handleDeleteBanner(id: string): Promise<void> {
    const bannerRef = ref(database, `banners/${id}`);
    const bannerSnapshot = await get(bannerRef);
    if (!bannerSnapshot.exists()) return handleDeleteErrorToast();

    const banner: Banner = bannerSnapshot.val();
    const imageId = banner.image.id;
    const imageRef = refStorage(storage, `images/${imageId}`);
    if (!imageRef) return handleDeleteErrorToast();

    deleteObject(imageRef).catch(handleDeleteErrorToast);

    await remove(bannerRef);
    await handleGetBanners();
  }

  const handleGetCategories = useCallback(async () => {
    const categoriesRef = ref(database, 'categories');
    const categoriesSnapshot = await get(categoriesRef);
    if (!categoriesSnapshot.exists()) return setCategories([]);

    const categoriesFirebase = categoryMapper<Categories[]>(categoriesSnapshot);
    if (!categoriesFirebase) return handleGetErrorToast();

    setCategories(categoriesFirebase);
  }, [handleGetErrorToast]);

  async function handleDeleteCategory(id: string): Promise<void> {
    const categoryRef = ref(database, `categories/${id}`);
    const categorySnapshot = await get(categoryRef);

    const category: Categories = categorySnapshot.val();
    const products = productMapper(category);

    products.forEach(async product => {
      product.images.forEach(async image => {
        const imageRef = refStorage(storage, `images/${image.id}`);
        if (!imageRef) return handleDeleteErrorToast();

        deleteObject(imageRef).catch(handleDeleteErrorToast);
      });

      const productRef = ref(database, `products/${product.id}`);
      await remove(productRef);
    });

    await remove(categoryRef);
    await handleGetCategories();
  }

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
        handleGetCategories,
        handleDeleteHighlight,
        handleDeleteBanner,
        handleDeleteCategory,
        handlePutAbout,
        handleCreateBanner,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
