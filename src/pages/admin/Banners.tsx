import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Banner } from '../../@types';
import {
  BannerCard,
  Container,
  Dialog,
  Icon,
  Sidebar,
  Spinner,
  Text,
} from '../../components';
import { useUser } from '../../hooks';

export function Banners() {
  const {
    isLoaded,
    banners: bannersFirebase,
    handleDeleteBanner,
    handleCreateBanner,
    handlePutBanner,
  } = useUser();

  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bannerId, setBannerId] = useState<string>('');
  const [banners, setBanners] = useState<Banner[]>([]);

  const quantityBanners = new Array(3).fill(0);
  const hasOnlyOneBanner = banners.length === 1;

  async function dialogDeleteBanner(): Promise<void> {
    setIsLoading(true);

    await handleDeleteBanner(bannerId);

    setIsOpenDialog(false);
    setIsLoading(false);
  }

  function onDelete(id: string): void {
    setBannerId(id);
    setIsOpenDialog(true);
  }

  function onClose(): void {
    setBannerId('');
    setIsOpenDialog(false);
  }

  async function onGetFile(file: File): Promise<void> {
    await handleCreateBanner(file);
  }
  async function onUpdate(id: string, file: File | null): Promise<void> {
    if (!file) {
      toast.error(
        'Desculpe, não consegui encontrar a imagem que você selecionou.',
      );
      return;
    }

    await handlePutBanner(id, file);
  }

  useEffect(() => {
    if (bannersFirebase.length) setBanners(bannersFirebase);
    else setBanners([]);
  }, [bannersFirebase]);

  return (
    <div className='flex w-full h-screen'>
      <Sidebar />

      <Container>
        <header className='flex flex-col w-full justify-center items-center mb-6 sm:mb-8 md:mb-0 gap-2'>
          <Text type='medium' toCenter>
            Cadastro de Banners de Boas Vindas
          </Text>

          <Text size='sm' toCenter>
            Nesta página você pode adicionar, editar e excluir banners. Os
            banners adicionados são exibidos para os seus usuários.
          </Text>
        </header>

        {isLoaded ? (
          <>
            <Text className='hidden md:flex mt-8 mb-10 mx-auto gap-1 text-center'>
              <Icon variant='info' color='primary' /> Adicione até{' '}
              <span className='font-semibold text-base text-text'>
                três banners
              </span>
              clicando no botão de
              <Icon variant='plus' color='primary' />
            </Text>

            <div className='flex flex-col mx-auto lg:max-w-[52rem] gap-6 sm:gap-8 md:gap-10'>
              <div className='flex flex-row flex-wrap justify-center items-center mx-auto gap-4'>
                {quantityBanners.map((_, index) => {
                  const banner = banners[index];
                  if (banner) {
                    return (
                      <BannerCard
                        key={banner.id}
                        variant='fill'
                        isDisabled={hasOnlyOneBanner}
                        onGetFile={async file =>
                          await onUpdate(banner.id, file)
                        }
                        banner={{
                          id: banner.id,
                          name: banner.image.name,
                          uri: banner.image.uri,
                        }}
                        onDelete={onDelete}
                      />
                    );
                  }

                  return (
                    <BannerCard
                      key={index}
                      onGetFile={onGetFile}
                      variant='empty'
                    />
                  );
                })}
              </div>

              <div className='hidden md:flex flex-col items-center lg:items-start gap-2'>
                <Text className='flex gap-1'>
                  <Icon variant='info' color='primary' />
                  Clique em
                  <Icon variant='pencil' color='primary' />
                  para editar/trocar o banner.
                </Text>

                <Text className='flex gap-1'>
                  <Icon variant='info' color='primary' />
                  Clique em
                  <Icon variant='trash' color='primary' />
                  para excluir o banner.
                </Text>
              </div>
            </div>
          </>
        ) : (
          <div className='flex flex-col w-full h-full gap-2 justify-center items-center'>
            <Text color='primary' type='medium' toCenter>
              Estamos carregando os suas lindos banners...
            </Text>

            <Spinner />
          </div>
        )}
      </Container>

      <Dialog
        isOpen={isOpenDialog}
        variant='banner'
        isLoading={isLoading}
        onAccept={async () => await dialogDeleteBanner()}
        onClose={onClose}
      />
    </div>
  );
}
