import { useEffect, useState } from 'react';

import { Highlight } from '../../@types';
import {
  BannerCard,
  Container,
  Dialog,
  EventModal,
  Icon,
  Sidebar,
  Spinner,
  Text,
} from '../../components';
import { useUser } from '../../hooks';

export function Events() {
  const { isLoaded, highlights: highlightsFirebase } = useUser();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [highlights, setHighlights] = useState<Highlight[]>([]);

  const quantityHighlights = new Array(3).fill(0);

  useEffect(() => {
    if (highlightsFirebase.length) setHighlights(highlightsFirebase);
  }, [highlightsFirebase]);

  return (
    <div className='flex w-full h-screen'>
      <Sidebar />

      <Container>
        <header className='flex flex-col w-full justify-center items-center mb-6 sm:mb-8 md:mb-0 gap-2'>
          <Text type='medium' toCenter>
            Cadastro de Divulgações
          </Text>

          <Text size='sm' toCenter>
            Nesta página você pode adicionar, editar e excluir divulgações sobre
            os seus trabalhos. As divulgações aparecerão para os seus usuários.
          </Text>
        </header>

        {isLoaded ? (
          <>
            <Text className='hidden md:flex mt-8 mb-10 mx-auto gap-1 text-center'>
              <Icon variant='info' color='primary' /> Adicione até{' '}
              <span className='font-semibold text-base text-text'>
                três divulgações
              </span>
              clicando no botão de
              <Icon variant='plus' color='primary' />
            </Text>

            <div className='flex flex-col mx-auto lg:max-w-[52rem] gap-6 sm:gap-8 md:gap-10'>
              <div className='flex flex-row flex-wrap justify-center items-center mx-auto gap-4'>
                {quantityHighlights.map((_, index) => {
                  const highlight = highlights[index];
                  if (highlight) {
                    return (
                      <BannerCard
                        key={highlight.id}
                        banner={{
                          id: highlight.id,
                          name: highlight.title,
                          uri: highlight.image.uri,
                        }}
                        variant='fill'
                        type='modal'
                        onDelete={() => setIsOpenDialog(true)}
                      />
                    );
                  }

                  return (
                    <BannerCard
                      key={index}
                      variant='empty'
                      type='modal'
                      onModal={() => setIsOpenModal(true)}
                      onDelete={() => setIsOpenDialog(true)}
                    />
                  );
                })}
              </div>

              <div className='hidden md:flex flex-col items-center lg:items-start gap-2'>
                <Text className='flex gap-1'>
                  <Icon variant='info' color='primary' />
                  Clique em
                  <Icon variant='pencil' color='primary' />
                  para editar a divulgação.
                </Text>

                <Text className='flex gap-1'>
                  <Icon variant='info' color='primary' />
                  Clique em
                  <Icon variant='trash' color='primary' />
                  para excluir a divulgação.
                </Text>
              </div>
            </div>
          </>
        ) : (
          <div className='flex flex-col w-full h-full gap-2 justify-center items-center'>
            <Text color='primary' type='medium' toCenter>
              Estamos carregando suas belas divulgações...
            </Text>

            <Spinner />
          </div>
        )}
      </Container>

      <Dialog
        isOpen={isOpenDialog}
        variant='event'
        onAccept={() => setIsOpenDialog(false)}
        onClose={() => setIsOpenDialog(false)}
      />

      {/**
       * TODO: You must change the variant to `edit` when event object exists.
       * TODO: You must create an `handleAddEvent` to handle the event added.
       */}
      <EventModal
        isOpen={isOpenModal}
        variant='add'
        onAdd={() => setIsOpenModal(false)}
        onClose={() => setIsOpenModal(false)}
      />
    </div>
  );
}
