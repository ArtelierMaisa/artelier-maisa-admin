import { useState } from 'react';

import { CategoryModalProps } from '../../@types';
import { categoryModalTitles } from '../../constants';
import { GenericButton, Icon, Input, Modal, Text } from '../';

export function CategoryModal(props: CategoryModalProps) {
  const { isOpen, variant, data, onAccept, onClose } = props;

  const isEdit = variant === 'edit';

  const [inputValue, setInputValue] = useState<string>(
    isEdit ? data!.name : '',
  );

  const label = isEdit ? 'Novo Nome da Categoria' : 'Nome da Categoria';

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose || onAccept}>
      <div className='relative flex flex-col w-11/12 md:w-[32rem] lg:h-auto overflow-hidden items-center p-6 gap-4 rounded-2xl bg-white shadow-default'>
        <button
          type='button'
          className='absolute flex top-0 right-0 justify-center items-center w-8 h-8 bg-primary rounded-tr-lg cursor-pointer hover:opacity-90 transition-colors duration-300'
          onClick={onClose}
        >
          <Icon variant='x' color='white' />
        </button>

        <Text type='semibold' color='primary' toCenter>
          {categoryModalTitles[variant]}
        </Text>

        <Input
          variant='input'
          type='text'
          value={inputValue}
          placeholder='Categoria X'
          label={label}
          maxLength={64}
          isHugWidth
          onChange={setInputValue}
        />

        <div className='flex flex-row items-center gap-2'>
          <Icon variant='info' color='primary' size='medium' />

          <Text color='primary'>
            Nome da categoria deve ser{' '}
            <span className='font-semibold text-base text-center text-primary'>
              único
            </span>
            , ou seja, não devem existir categorias com o mesmo nome.
          </Text>
        </div>

        <div className='flex flex-row w-full mt-6 gap-2 justify-center items-center'>
          <GenericButton
            variant='primary'
            type='medium'
            title='Sim'
            isHugWidth
            onClick={onAccept}
          />

          <GenericButton
            variant='secondary'
            type='medium'
            title='Não'
            isHugWidth
            onClick={onClose}
          />
        </div>
      </div>
    </Modal>
  );
}
