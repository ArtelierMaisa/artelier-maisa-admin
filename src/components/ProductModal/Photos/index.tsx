import { FormEvent, useState } from 'react';

import { PhotosProps, ProductModalImagesProps } from '../../../@types';
import { productModalTitles } from '../../../constants';
import { BannerCard, GenericButton, Icon, Text } from '../../';

export function Photos(props: PhotosProps) {
  const { variant, data, onAdd, onGoBack, onClose } = props;

  const isEdit = variant === 'edit';

  const [images, setImages] = useState<ProductModalImagesProps | null>(
    isEdit ? data! : null,
  );

  const quantityBanners = new Array(4).fill(0);

  function handleAdd(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (images) onAdd(images);
  }

  return (
    <form
      onSubmit={handleAdd}
      className='relative flex flex-col w-full md:w-[40rem] h-full md:h-modal overflow-hidden justify-center items-center px-10 py-6 gap-2 rounded-none md:rounded-2xl bg-white shadow-default scrollbar scrollbar-w-3 scrollbar-thumb-rounded-lg scrollbar-thumb-primary scrollbar-track-white-color overflow-y-scroll'
    >
      <button
        type='button'
        className='absolute flex top-0 right-0 justify-center items-center w-8 h-8 bg-primary rounded-none cursor-pointer hover:opacity-90 transition-colors duration-300'
        onClick={onClose}
      >
        <Icon variant='x' color='white' />
      </button>

      <Text type='semibold' color='primary' toCenter>
        {productModalTitles[variant]}
      </Text>

      <div className='flex flex-row justify-center items-center my-2 gap-1'>
        <Icon variant='info' color='primary' />

        <Text color='primary' toCenter>
          O produto deve ter entre{' '}
          <span className='font-semibold text-primary text-base'>
            uma ou quatro
          </span>{' '}
          fotos.
        </Text>
      </div>

      <div className='flex flex-row flex-wrap justify-center items-center mb-3 gap-2'>
        {quantityBanners.map((_, index) => {
          if (images && images[index]) {
            const image = images[index];
            return <BannerCard key={image!.id} variant='fill' banner={image} />;
          } else return <BannerCard key={index} variant='add' />;
        })}
      </div>

      <div className='flex flex-col w-full justify-start items-center gap-2 px-4'>
        <div className='flex flex-row w-full justify-start items-center gap-1'>
          <Icon variant='info' color='primary' />

          <Text>Clique em</Text>

          <Icon variant='pencil' color='primary' />

          <Text>para editar a foto do produto.</Text>
        </div>

        <div className='flex flex-row w-full justify-start items-center gap-1'>
          <Icon variant='info' color='primary' />

          <Text>Clique em</Text>

          <Icon variant='trash' color='primary' />

          <Text>para excluir a foto do produto.</Text>
        </div>
      </div>

      <div className='flex flex-row w-full mt-6 px-4 gap-2 justify-center items-center'>
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
          title='Cadastrar'
          isHugWidth
        />
      </div>
    </form>
  );
}
