import { ChangeEvent, useRef } from 'react';
import { toast } from 'sonner';

import { BannerCardProps, BannerCardVariant, IconProps } from '../../@types';
import { ACCEPT_EXTENSION_FILES } from '../../config';
import { DotButton, Icon, Spinner, Text } from '../';

export function BannerCard(props: BannerCardProps) {
  const {
    variant = 'add',
    isLoading = false,
    banner,
    onGetFile,
    onDelete,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  function handleBannerDelete(): void {
    if (banner && onDelete) onDelete(banner.id);
  }

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
      const file = files[0];
      const isAcceptFile = ACCEPT_EXTENSION_FILES.includes(file.type);

      if (!isAcceptFile) {
        toast.error(
          'Formato da imagem selecionada é inválido! Os formatos aceitos são: PNG, JPG ou JPEG.',
          { duration: 7500 },
        );
        return;
      } else if (onGetFile) return onGetFile(file);
    }

    handleGetFileError();
  }

  const input: React.JSX.Element = (
    <input
      type='file'
      ref={inputRef}
      accept='image/png, image/jpg, image/jpeg'
      className='hidden'
      multiple={false}
      readOnly
      onChange={handleGetFile}
      onError={handleGetFileError}
    />
  );

  const commonIconProps: Omit<IconProps, 'variant'> = {
    size: 'medium',
    color: 'primary',
    isCursorPointer: true,
  };

  const commonClassNames =
    'items-center justify-center w-64 h-56 bg-background-color ring-2 ring-primary overflow-hidden rounded-lg';

  const bannerCardVariants: Record<BannerCardVariant, React.JSX.Element> = {
    fill: (
      <>
        {input}

        <div className={`flex flex-col ${commonClassNames}`}>
          <img
            alt={`Banner ${banner?.name || ''}`}
            src={banner?.uri}
            className='w-full h-44 object-cover'
          />

          <div className='flex flex-row justify-between items-center w-full h-auto p-2'>
            <button
              type='button'
              className='w-auto h-auto hover:opacity-90'
              onClick={handleOpenExplorer}
            >
              <Icon variant='pencil' {...commonIconProps} />
            </button>

            <button
              type='button'
              className='w-auto h-auto hover:opacity-90'
              onClick={handleBannerDelete}
            >
              <Icon variant='trash' {...commonIconProps} />
            </button>
          </div>
        </div>
      </>
    ),
    empty: (
      <>
        {input}

        <button
          type='button'
          className={`flex ${commonClassNames} cursor-pointer hover:opacity-90 transition-opacity duration-200`}
          onClick={handleOpenExplorer}
        >
          {isLoading ? <Spinner size='large' /> : <DotButton mode='figure' />}
        </button>
      </>
    ),
    add: (
      <>
        {input}

        <button
          type='button'
          className={`flex flex-col gap-2 ${commonClassNames} cursor-pointer hover:opacity-90 transition-opacity duration-200`}
          onClick={handleOpenExplorer}
        >
          {isLoading ? (
            <Spinner size='large' />
          ) : (
            <>
              <DotButton mode='figure' />

              <Text type='semibold' color='primary' toCenter>
                Clique para adicionar
              </Text>
            </>
          )}
        </button>
      </>
    ),
  };

  return bannerCardVariants[variant];
}
