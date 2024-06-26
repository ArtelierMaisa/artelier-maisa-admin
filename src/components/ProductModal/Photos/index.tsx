import { nanoid } from 'nanoid';
import { useState } from 'react';

import { PhotosProps, ProductModalImageProps } from '../../../@types';
import { productModalTitles } from '../../../constants';
import { BannerCard, GenericButton, Icon, Text } from '../../';

export function Photos(props: PhotosProps) {
  const { variant, data, isLoading = false, onAdd, onGoBack, onClose } = props;

  const [images, setImages] = useState<ProductModalImageProps[] | null>(
    data || null,
  );
  const [filesImages, setFilesImages] = useState<File[]>([]);

  const quantityBanners = new Array(4).fill(0);

  function onDeleteImage(id: string): void {
    if (images && !isLoading) {
      const imagesFiltered = images.filter(image => image.id !== id);
      setImages(imagesFiltered);
    }
  }

  function handleGetFile(file: File | null): void {
    if (file && !isLoading) {
      const blob = new Blob([file], { type: file.type });
      const reader = new FileReader();
      reader.onload = e => {
        const newImage = {
          id: nanoid(),
          name: file.name,
          uri: (e.target?.result as string) || '',
        };

        if (images) setImages([...images, newImage]);
        else setImages([newImage]);
      };
      reader.readAsDataURL(blob);

      setFilesImages([...filesImages, file]);
    }
  }

  function handleAdd(): void {
    if (images) onAdd(images, filesImages);
    else onAdd([], filesImages);
  }

  return (
    <div className='relative flex flex-col w-full md:w-[40rem] h-full md:h-auto md:max-h-[90%] items-center overflow-hidden rounded-none md:rounded-2xl px-6 md:px-10 py-6 gap-2 bg-white shadow-default scrollbar scrollbar-w-3 scrollbar-thumb-rounded-lg scrollbar-thumb-primary scrollbar-track-white-color overflow-y-scroll'>
      <div className='w-full m-auto'>
        <button
          type='button'
          className='absolute flex top-0 right-0 justify-center items-center w-8 h-8 bg-primary rounded-none cursor-pointer hover:opacity-90 transition-colors duration-300 focus:outline-none focus:ring focus:ring-primary60 focus:border-primary60'
          onClick={onClose}
          disabled={isLoading}
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
              return (
                <BannerCard
                  key={image!.id}
                  variant='fill'
                  banner={image}
                  onDelete={onDeleteImage}
                  isDelete
                />
              );
            } else
              return (
                <BannerCard
                  key={index}
                  variant='add'
                  onGetFile={handleGetFile}
                />
              );
          })}
        </div>

        <div className='hidden sm:flex flex-col w-full justify-center md:justify-start items-center gap-2 px-4'>
          <Text className='flex flex-row w-full justify-center md:justify-start items-center gap-1'>
            <Icon variant='info' color='primary' /> Clique em{' '}
            <Icon variant='pencil' color='primary' /> para editar a foto do
            produto.
          </Text>

          <Text className='flex flex-row w-full justify-center md:justify-start items-center gap-1'>
            <Icon variant='info' color='primary' /> Clique em{' '}
            <Icon variant='trash' color='primary' /> para excluir a foto do
            produto.
          </Text>
        </div>

        <div className='flex flex-col sm:flex-row w-full mt-6 sm:px-4 gap-2 justify-center items-center'>
          <GenericButton
            variant='secondary'
            type='medium'
            title='Voltar'
            isHugWidth
            isDisabled={isLoading}
            onClick={onGoBack}
          />

          <GenericButton
            mode='submit'
            variant='primary'
            type='medium'
            title='Cadastrar'
            isHugWidth
            isDisabled={isLoading}
            isLoading={isLoading}
            onClick={handleAdd}
          />
        </div>
      </div>
    </div>
  );
}
