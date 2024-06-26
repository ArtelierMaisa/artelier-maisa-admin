import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { ExternalToast, toast } from 'sonner';

import { EventModalProps, Highlight } from '../../@types';
import { eventModalTitles } from '../../constants';
import { useUser } from '../../hooks';
import { GenericButton, Icon, ImageCard, Input, Modal, Text } from '../';

export function EventModal(props: EventModalProps) {
  const { isOpen, variant, data, onClose } = props;

  const { highlights, handleCreateHighlight, handlePutHighlight } = useUser();

  const toastOptions: ExternalToast = { duration: 3000 };
  const currentHighlight = highlights.find(
    highlight => highlight.id === data?.id,
  );

  const [highlight, setHighlight] = useState<Highlight | null>(
    currentHighlight || null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const imageCardType = currentHighlight || file ? 'edit' : 'photo';

  async function onSumbit(): Promise<void> {
    if (!currentHighlight && !file) {
      toast.error(
        'Ops! Você deve adicionar uma imagem para publicar uma divulgação.',
        { duration: 7500 },
      );

      return;
    }

    setIsLoading(true);

    if (currentHighlight) {
      await handlePutHighlight({
        ...highlight!,
        file,
      });
      toast.success('Divulgação editada com sucesso!', toastOptions);
    } else {
      await handleCreateHighlight({
        ...highlight!,
        name: highlight!.title,
        id: nanoid(),
        file,
      });
      toast.success(
        'Divulgação está sendo criada! Aguarde um momento...',
        toastOptions,
      );
    }
  }

  useEffect(() => {
    if (!isOpen) {
      setIsLoading(false);
      setHighlight(null);
      setFile(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (currentHighlight) setHighlight(currentHighlight);
  }, [currentHighlight]);

  useEffect(() => {
    if (highlight && highlight.removedAt !== currentHighlight?.removedAt) {
      setFile(null);
      onClose && onClose();
    }
  }, [highlight, currentHighlight, onClose]);

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <div className='relative flex flex-col w-full md:w-[32rem] h-full md:h-auto overflow-hidden justify-center items-center p-6 gap-4 rounded-none md:rounded-2xl bg-white shadow-default'>
        <button
          type='button'
          className='absolute flex top-0 right-0 justify-center items-center w-8 h-8 bg-primary rounded-none md:rounded-tr-lg cursor-pointer hover:opacity-90 transition-colors duration-300 focus:outline-none focus:ring focus:ring-primary60 focus:border-primary60'
          onClick={onClose}
          disabled={isLoading}
        >
          <Icon variant='x' color='white' />
        </button>

        <Text type='semibold' color='primary' toCenter>
          {eventModalTitles[variant]}
        </Text>

        <Input
          id='input-name'
          variant='input'
          type='text'
          value={highlight ? highlight.title : ''}
          placeholder='Título da divulgação'
          label='Título'
          maxLength={64}
          isHugWidth
          isRequired
          isDisabled={isLoading}
          onChange={name => setHighlight({ ...highlight!, title: name })}
        />

        <Input
          id='input-description'
          variant='textarea'
          type='text'
          value={highlight ? highlight.description : ''}
          placeholder='Descreva como foi...'
          label='Descrição'
          maxLength={512}
          isHugWidth
          isRequired
          isDisabled={isLoading}
          onChange={description => setHighlight({ ...highlight!, description })}
        />

        <ImageCard
          type={imageCardType}
          isDisabled={isLoading}
          onGetFile={setFile}
        />

        <GenericButton
          type='medium'
          variant='primary'
          title={currentHighlight ? 'Editar' : 'Cadastrar'}
          onClick={async () => await onSumbit()}
          isHugWidth
          isDisabled={isLoading}
          isLoading={isLoading}
        />
      </div>
    </Modal>
  );
}
