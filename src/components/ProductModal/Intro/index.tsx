import { FormEvent, useState } from 'react';

import { IntroProps } from '../../../@types';
import { productModalTitles } from '../../../constants';
import { GenericButton, Icon, Input, Switch, Text } from '../../';

export function Intro(props: IntroProps) {
  const { variant, data, onClose, onContinue } = props;

  const [name, setName] = useState<string>(data?.name || '');
  const [description, setDescription] = useState<string>(
    data?.description || '',
  );
  const [isOccult, setIsOccult] = useState<boolean>(data?.isOccult || false);

  function handleContinue(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    onContinue({ description, isOccult, name });
  }

  return (
    <form
      onSubmit={handleContinue}
      className='relative flex flex-col w-full md:w-[32rem] h-full md:h-auto overflow-hidden justify-center items-center p-6 gap-2 rounded-none md:rounded-2xl bg-white shadow-default'
    >
      <button
        type='button'
        className='absolute flex top-0 right-0 justify-center items-center w-8 h-8 bg-primary rounded-none md:rounded-tr-lg cursor-pointer hover:opacity-90 transition-colors duration-300 focus:outline-none focus:ring focus:ring-primary60 focus:border-primary60'
        onClick={onClose}
      >
        <Icon variant='x' color='white' />
      </button>

      <Text type='semibold' color='primary' toCenter>
        {productModalTitles[variant]}
      </Text>

      <Input
        id='input-name'
        variant='input'
        type='text'
        value={name}
        placeholder='Nome do produto'
        label='Nome'
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
        placeholder='Descreva o produto...'
        label='Descrição'
        maxLength={512}
        isHugWidth
        isRequired
        onChange={setDescription}
      />

      <div className='flex flex-row w-full justify-end items-center mb-4 gap-1'>
        <Text type='medium' color='primary'>
          Disponível para a venda:
        </Text>

        <Switch checked={!isOccult} onToggle={setIsOccult} variant='neutral' />
      </div>

      <GenericButton
        mode='submit'
        type='medium'
        variant='primary'
        title='Continuar'
        isHugWidth
      />
    </form>
  );
}
