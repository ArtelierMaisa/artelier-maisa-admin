import { useState } from 'react';

import {
  BannerCard,
  Container,
  Dialog,
  Icon,
  Sidebar,
  Text,
} from '../../components';

export function Banners() {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const quantityBanners = new Array(3).fill(0);

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
            {quantityBanners.map((_, index) => (
              // TODO: Change variant to `fill` when banner card object is available
              <BannerCard
                key={index}
                variant='empty'
                onDelete={() => setIsOpenDialog(true)}
              />
            ))}
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
      </Container>

      <Dialog
        isOpen={isOpenDialog}
        variant='banner'
        onAccept={() => setIsOpenDialog(false)}
        onClose={() => setIsOpenDialog(false)}
      />
    </div>
  );
}
