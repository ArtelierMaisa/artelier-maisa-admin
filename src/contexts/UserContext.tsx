import { get, onValue, ref, remove, set } from 'firebase/database';
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
  EventModalAdd,
  Highlight,
  HighlightEdit,
  Image,
  Product,
  ProductCreateProps,
  ProductEditProps,
  UserContextProps,
} from '../@types';
import { DEFAULT_PHONE } from '../config';
import {
  categoryMapper,
  mapper,
  productImagesMapper,
  productMapper,
} from '../helpers';
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

  function handleCreateErrorToast(): void {
    toast.error(
      'Falha na ação de criação! Algo deu errado ao tentar criar. Por favor, tente novamente. Se o problema persistir, entre em contato com o suporte técnico.',
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

    if (newAbout.file) {
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
              set(
                ref(database, `about/${newAbout.id}`),
                commonAboutProps,
              ).catch(handleEditErrorToast);
              setAbout({ ...about, ...commonAboutProps });
            })
            .catch(handleEditErrorToast);
        },
      );
    } else {
      const commonAboutProps = {
        name: newAbout.name,
        description: newAbout.description,
        additional: newAbout.additional,
        uri: about.uri,
      };
      set(ref(database, `about/${newAbout.id}`), commonAboutProps).catch(
        handleEditErrorToast,
      );
      setAbout({ ...about, ...commonAboutProps });
    }
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

  async function handleCreateHighlight(data: EventModalAdd): Promise<void> {
    const imageId = nanoid();

    const storageRef = refStorage(storage, `images/${imageId}`);
    const uploadTask = uploadBytesResumable(storageRef, data.file!);

    const createdAt = new Date().getTime();
    const removedAt = createdAt + 14 * 24 * 60 * 60 * 1000; // 14 days

    uploadTask.on(
      'state_changed',
      () => {},
      handleUpdateFileErrorToast,
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(uri => {
            const commonHighlightProps = {
              title: data.name,
              description: data.description,
              image: {
                id: imageId,
                name: data.file!.name,
                uri,
              },
              createdAt,
              removedAt,
            };
            set(
              ref(database, `highlights/${data.id}`),
              commonHighlightProps,
            ).catch(handleEditErrorToast);
            handleGetHighlights();
          })
          .catch(handleEditErrorToast);
      },
    );
  }

  async function handlePutHighlight(
    newHighlight: HighlightEdit,
  ): Promise<void> {
    const highlightRef = ref(database, `highlights/${newHighlight.id}`);
    const highlightSnapshot = await get(highlightRef);
    if (!highlightSnapshot.exists()) return handleEditErrorToast();

    const highlight: Highlight = highlightSnapshot.val();

    const removedAt = new Date().getTime() + 14 * 24 * 60 * 60 * 1000; // 14 days

    if (newHighlight.file) {
      const storageRef = refStorage(storage, `images/${highlight.image.id}`);
      const uploadTask = uploadBytesResumable(storageRef, newHighlight.file);

      uploadTask.on(
        'state_changed',
        () => {},
        handleUpdateFileErrorToast,
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then(uri => {
              const commonHighlightProps = {
                title: newHighlight.title,
                description: newHighlight.description,
                removedAt,
                image: {
                  id: highlight.image.id,
                  name: newHighlight.file!.name,
                  uri,
                },
              };
              set(
                ref(database, `highlights/${newHighlight.id}`),
                commonHighlightProps,
              ).catch(handleEditErrorToast);
              handleGetHighlights();
            })
            .catch(handleEditErrorToast);
        },
      );
    } else {
      const commonHighlightProps = {
        title: newHighlight.title,
        description: newHighlight.description,
        removedAt,
        image: {
          id: highlight.image.id,
          name: highlight.image.name,
          uri: highlight.image.uri,
        },
      };
      set(
        ref(database, `highlights/${newHighlight.id}`),
        commonHighlightProps,
      ).catch(handleEditErrorToast);

      await handleGetHighlights();
    }
  }

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

  async function handlePutBanner(id: string, file: File): Promise<void> {
    const bannerRef = ref(database, `banners/${id}`);
    const bannerSnapshot = await get(bannerRef);

    const banner: Banner = bannerSnapshot.val();

    if (!bannerSnapshot.exists()) return handleEditErrorToast();

    if (file) {
      const storageRef = refStorage(storage, `images/${banner.image.id}`);
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
                  id: banner.image.id,
                  name: file.name,
                  uri,
                },
              };
              set(ref(database, `banners/${id}`), commonBannerProps).catch(
                handleEditErrorToast,
              );
              handleGetBanners();
            })
            .catch(handleEditErrorToast);
        },
      );
    }
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

  async function handleCreateCategory(name: string): Promise<void> {
    const categoryId = nanoid();

    set(ref(database, `categories/${categoryId}`), { name }).catch(
      handleCreateErrorToast,
    );
  }

  async function handleDeleteCategory(id: string): Promise<void> {
    const categoryRef = ref(database, `categories/${id}`);
    const categorySnapshot = await get(categoryRef);

    if (!categorySnapshot.exists()) return handleDeleteErrorToast();

    const category: Categories = categorySnapshot.val();

    if (category.products) {
      const products = productMapper(category);

      for (const product of products) {
        if (product.images) {
          const imagesArray = Object.values(product.images);

          for (const image of imagesArray) {
            if (!image) return handleDeleteErrorToast();

            const imageRef = refStorage(storage, `images/${image.id}`);
            if (imageRef) {
              await deleteObject(imageRef).catch(handleDeleteErrorToast);
            }
          }
        }
      }
    }

    await remove(categoryRef);
  }

  async function handlePutCategory(id: string, name: string): Promise<void> {
    const categoryRef = ref(database, `categories/${id}`);
    const categorySnapshot = await get(categoryRef);

    if (!categorySnapshot.exists()) return handleEditErrorToast();
    const category: Categories = categorySnapshot.val();

    set(ref(database, `categories/${id}`), {
      name,
      products: category?.products || null,
    }).catch(handleEditErrorToast);
  }

  async function handleCreateProduct(newProduct: ProductCreateProps) {
    const productId = nanoid();

    const { categoryId } = newProduct;

    const uploadImage = (file: File): Promise<Image> =>
      new Promise((resolve, reject) => {
        const imageId = nanoid();
        const storageRef = refStorage(storage, `images/${imageId}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          () => {},
          reject,
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then(uri => {
                const newImage = {
                  id: imageId,
                  name: file.name,
                  uri,
                };

                resolve(newImage);
              })
              .catch(reject);
          },
        );
      });

    const images = await Promise.all(
      newProduct.files.map(file => uploadImage(file)),
    )
      .then(images => images)
      .catch(handleCreateErrorToast);

    if (!images) return handleCreateErrorToast();

    const imagesObject = images.reduce(
      (acc: { [key: string]: Image }, image) => {
        acc[image.id] = image;
        return acc;
      },
      {},
    );

    const whatsapp = newProduct.whatsapp
      ? newProduct.whatsapp.replace(/\D/g, '')
      : DEFAULT_PHONE;

    const product = {
      ...newProduct,
      material: newProduct.material || '',
      size: newProduct.size || '',
      weight: newProduct.weight || '',
      whatsapp,
      images: imagesObject,
      createdAt: new Date().getTime(),
      updatedAt: 0,
    };

    set(
      ref(database, `categories/${categoryId}/products/${productId}`),
      product,
    ).catch(handleCreateErrorToast);
  }

  async function handlePutProduct(newProduct: ProductEditProps): Promise<void> {
    const whatsapp = newProduct.whatsapp
      ? newProduct.whatsapp.replace(/\D/g, '')
      : DEFAULT_PHONE;

    const product = {
      ...newProduct,
      whatsapp,
      updatedAt: new Date().getTime(),
    };

    set(
      ref(
        database,
        `categories/${newProduct.categoryId}/products/${newProduct.id}`,
      ),
      product,
    ).catch(handleEditErrorToast);
  }

  async function handleDeleteProduct(
    categoryId: string,
    productId: string,
  ): Promise<void> {
    const productRef = ref(
      database,
      `categories/${categoryId}/products/${productId}`,
    );
    const productSnapshot = await get(productRef);

    if (!productSnapshot.exists()) {
      return handleDeleteErrorToast();
    }

    const product: Product = productImagesMapper(productSnapshot.val());

    if (product.images) {
      const imagesArray = Object.values(product.images);

      for (const image of imagesArray) {
        const imageRef = refStorage(storage, `images/${image.id}`);
        if (imageRef) {
          await deleteObject(imageRef).catch(handleDeleteErrorToast);
        }
      }
    }

    await remove(productRef).catch(handleDeleteErrorToast);
  }

  async function handleOccultProduct(
    categoryId: string,
    productId: string,
  ): Promise<void> {
    const productRef = ref(
      database,
      `categories/${categoryId}/products/${productId}`,
    );
    const productSnapshot = await get(productRef);
    if (!productSnapshot.exists()) return handleDeleteErrorToast();

    const product: Product = productSnapshot.val();
    const newProduct = {
      ...product,
      isOccult: !product.isOccult,
    };

    set(productRef, newProduct).catch(handleEditErrorToast);
  }

  const fetchFirebase = useCallback(async () => {
    await handleGetBanners();
    await handleGetHighlights();
    await handleGetAbout();

    setIsLoaded(true);
  }, [handleGetAbout, handleGetBanners, handleGetHighlights]);

  useEffect(() => {
    if (isAuthenticated) fetchFirebase();
  }, [isAuthenticated, fetchFirebase]);

  useEffect(() => {
    if (isAuthenticated) {
      const categoriesRef = ref(database, 'categories');

      const unsubscribe = onValue(categoriesRef, categoriesSnapshot => {
        if (!categoriesSnapshot.val()) return setCategories([]);

        const categoriesFirebase =
          categoryMapper<Categories[]>(categoriesSnapshot);
        if (!categoriesFirebase) {
          setCategories([]);
          return handleGetErrorToast();
        }

        setCategories(categoriesFirebase);
      });

      () => {
        unsubscribe();
      };
    }
  }, [isAuthenticated, handleGetErrorToast]);

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
        handleDeleteCategory,
        handleDeleteProduct,
        handlePutAbout,
        handlePutBanner,
        handlePutCategory,
        handlePutProduct,
        handlePutHighlight,
        handleOccultProduct,
        handleCreateBanner,
        handleCreateCategory,
        handleCreateHighlight,
        handleCreateProduct,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
