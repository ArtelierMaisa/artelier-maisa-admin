import { useState } from 'react';

import { EventModalProps } from '../../@types';
import { eventModalTitles } from '../../constants';
import { GenericButton, Icon, ImageCard, Input, Modal, Text } from '../';

export function EventModal(props: EventModalProps) {
  const { isOpen, variant, data, onAdd, onClose } = props;

  const isEdit = variant === 'edit';

  const [name, setName] = useState<string>(isEdit ? data!.name : '');
  const [description, setDescription] = useState<string>(
    isEdit ? data!.description : '',
  );
  const [file, setFile] = useState<File | null>(null);

  const imageCardType = isEdit || file ? 'edit' : 'photo';

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose || onAdd}>
      <div className='relative flex flex-col w-full md:w-[32rem] h-full md:h-auto overflow-hidden justify-center items-center p-6 gap-4 rounded-none md:rounded-2xl bg-white shadow-default'>
        <button
          type='button'
          className='absolute flex top-0 right-0 justify-center items-center w-8 h-8 bg-primary rounded-none md:rounded-tr-lg cursor-pointer hover:opacity-90 transition-colors duration-300'
          onClick={onClose}
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
          value={name}
          placeholder='Título da divulgação'
          label='Título'
          maxLength={64}
          isHugWidth
          isRequired
          onChange={setName}
        />

        <Input
          id='input-description'
          variant='textarea'
          type='text'
          value={description}
          placeholder='Descreva como foi...'
          label='Descrição'
          maxLength={512}
          isHugWidth
          isRequired
          onChange={setDescription}
        />

        <ImageCard type={imageCardType} onGetFile={setFile} />

        <GenericButton
          type='medium'
          variant='primary'
          title={isEdit ? 'Editar' : 'Cadastrar'}
          onClick={onAdd}
          isHugWidth
        />
      </div>
    </Modal>
  );
}