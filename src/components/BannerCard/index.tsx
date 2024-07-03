import { ChangeEvent, memo, useRef, useState } from 'react';
import { toast } from 'sonner';

import { BannerCardProps, BannerCardVariant, IconProps } from '../../@types';
import { ACCEPT_EXTENSION_FILES } from '../../config';
import { DotButton, Icon, Spinner, Text } from '../';

function BannerCard(props: BannerCardProps) {
  const {
    variant = 'add',
    type = 'file-system',
    isLoading = false,
    isDisabled = false,
    isDelete = false,
    banner,
    onGetFile,
    onDelete,
    onModal,
  } = props;

  const [fileValue, setFileValue] = useState<string>('');

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

  function handleInteractionWithCard(): void {
    if (type === 'file-system') handleOpenExplorer();
    else if (onModal) onModal();
  }

  const input: React.JSX.Element = (
    <input
      type='file'
      value={fileValue}
      ref={inputRef}
      accept='image/png, image/jpg, image/jpeg'
      className='hidden'
      multiple={false}
      readOnly
      onClick={() => setFileValue('')}
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
    'items-center justify-center w-64 h-56 bg-transparent ring-2 ring-primary overflow-hidden rounded-lg';

  const justifyContentForBottomButtons = isDisabled
    ? 'justify-start'
    : 'justify-between';

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

          <div
            className={`flex flex-row ${justifyContentForBottomButtons} items-center w-full h-auto p-2`}
          >
            {!isDelete && (
              <button
                type='button'
                className='w-auto h-auto rounded-lg hover:opacity-90 focus:outline-none focus:ring focus:ring-primary60 focus:border-primary60'
                onClick={handleInteractionWithCard}
              >
                <Icon variant='pencil' {...commonIconProps} />
              </button>
            )}

            {!isDisabled && (
              <button
                type='button'
                className='w-auto h-auto rounded-lg hover:opacity-90 focus:outline-none focus:ring focus:ring-primary60 focus:border-primary60'
                onClick={handleBannerDelete}
              >
                <Icon variant='trash' color='primary' {...commonIconProps} />
              </button>
            )}
          </div>
        </div>
      </>
    ),
    empty: (
      <>
        {input}

        <button
          type='button'
          className={`flex ${commonClassNames} cursor-pointer hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring focus:ring-primary60 focus:border-primary60`}
          onClick={handleInteractionWithCard}
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
          className={`flex flex-col gap-2 ${commonClassNames} cursor-pointer hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring focus:ring-primary60 focus:border-primary60`}
          onClick={handleInteractionWithCard}
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

export default memo(BannerCard);
