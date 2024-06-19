import { FormEvent, useState } from 'react';

import { DetailsDataProps, DetailsProps } from '../../../@types';
import { productModalTitles } from '../../../constants';
import { GenericButton, Icon, Input, Text } from '../../';

export function Details(props: DetailsProps) {
  const { variant, data, onContinue, onGoBack, onClose } = props;

  const [details, setDetails] = useState<DetailsDataProps>(
    data || ({} as DetailsDataProps),
  );

  function handleContinue(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    onContinue({ ...details });
  }

  return (
    <form
      onSubmit={handleContinue}
      className='relative flex flex-col w-full md:w-[32rem] h-full md:h-auto overflow-hidden items-center p-6 gap-2 rounded-none md:rounded-2xl bg-white shadow-default scrollbar scrollbar-w-3 scrollbar-thumb-rounded-lg scrollbar-thumb-primary scrollbar-track-white-color overflow-y-auto'
    >
      <div className='w-full m-auto'>
        <button
          type='button'
          className='absolute flex top-0 right-0 justify-center items-center w-8 h-8 bg-primary rounded-none md:rounded-tr-lg cursor-pointer hover:opacity-90 transition-colors duration-300'
          onClick={onClose}
        >
          <Icon variant='x' color='white' />
        </button>

        <Text type='semibold' color='primary' className='mb-2' toCenter>
          {productModalTitles[variant]}
        </Text>

        <div className='flex flex-col gap-2'>
          <Input
            id='input-material'
            variant='input'
            type='material'
            value={details?.material || ''}
            placeholder='Material principal do produto'
            label='Material (Opcional)'
            maxLength={32}
            isHugWidth
            onChange={material => setDetails({ ...details, material })}
          />

          <Input
            id='input-size'
            variant='input'
            type='size'
            value={details?.size || ''}
            placeholder='Tamanho do produto'
            label='Tamanho (Opcional)'
            maxLength={32}
            isHugWidth
            onChange={size => setDetails({ ...details, size })}
          />

          <Input
            id='input-weight'
            variant='input'
            type='weight'
            value={details?.weight || ''}
            placeholder='Peso do produto'
            label='Peso (Opcional)'
            maxLength={32}
            isHugWidth
            onChange={weight => setDetails({ ...details, weight })}
          />

          <Input
            id='input-whatsapp'
            variant='input-whatsapp'
            type='whatsapp'
            value={details?.whatsapp || ''}
            placeholder='+55 (47) 9 9999-9999'
            label='WhatsApp (Opcional)'
            maxLength={20}
            isHugWidth
            onChange={whatsapp => setDetails({ ...details, whatsapp })}
          />

          <Input
            id='input-currency'
            variant='input-currency'
            type='currency'
            value={details?.price || ''}
            placeholder='R$ 49,99'
            label='Preço (Opcional)'
            isHugWidth
            isRequired
            onChange={price => setDetails({ ...details, price })}
          />
        </div>

        <div className='flex flex-col sm:flex-row w-full mt-6 sm:px-4 gap-2 justify-center items-center'>
          <GenericButton
            variant='secondary'
            type='medium'
            title='Voltar'
            isHugWidth
            onClick={onGoBack}
          />

          <GenericButton
            mode='submit'
            variant='primary'
            type='medium'
            title='Continuar'
            isHugWidth
          />
        </div>
      </div>
    </form>
  );
}
