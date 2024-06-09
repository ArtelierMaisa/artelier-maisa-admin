import { ChangeEvent, useRef } from 'react';
import { toast } from 'sonner';

import { ImageCardProps } from '../../@types';
import { ACCEPT_EXTENSION_FILES } from '../../config';
import { imageCardTitles, imageCardTypes } from '../../constants';
import { DotButton, Text } from '../';

export function ImageCard(props: ImageCardProps) {
  const { type = 'photo', onGetFile } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  function handleGetFileError(): void {
    if (onGetFile) onGetFile(null);
    toast.error('Não foi possível capturar a imagem. Tente novamente.');
  }

  function handleOpenExplorer(): void {
    if (inputRef.current) inputRef.current.click();
  }

  function handleGetFile(event: ChangeEvent<HTMLInputElement>): void {
    const files = event.target.files;

    if (files) {
      const isAcceptFile = ACCEPT_EXTENSION_FILES.includes(files[0].type);

      if (!isAcceptFile) {
        toast.error(
          'Formato da imagem selecionada é inválido! Os formatos aceitos são: PNG, JPG ou JPEG.',
          { duration: 7500 },
        );
        return;
      } else if (onGetFile) return onGetFile(files[0]);
    }

    handleGetFileError();
  }

  return (
    <>
      <input
        type='file'
        ref={inputRef}
        accept='image/png, image/jpg, image/jpeg'
        multiple={false}
        className='hidden'
        readOnly
        onChange={handleGetFile}
        onError={handleGetFileError}
      />

      <button
        type='button'
        className='flex flew-row w-64 sm:w-96 h-[4.5rem] justify-center items-center px-5 gap-2 bg-white ring-1 ring-primary rounded-lg cursor-pointer hover:opacity-90 transition-colors duration-300'
        onClick={handleOpenExplorer}
      >
        <div className='hidden sm:flex'>
          <DotButton mode='figure' type={imageCardTypes[type]} />
        </div>

        <Text type='semibold' color='primary' toCenter isCursorPointer>
          {imageCardTitles[type]}
        </Text>
      </button>
    </>
  );
}
