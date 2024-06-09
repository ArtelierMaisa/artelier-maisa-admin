import { ChangeEvent, useRef } from 'react';

import { ImageCardProps } from '../../@types';
import { imageCardTitles, imageCardTypes } from '../../constants';
import { DotButton, Text } from '../';

export function ImageCard(props: ImageCardProps) {
  const { type = 'photo', onGetFile } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  function handleOpenExplorer(): void {
    if (inputRef.current) inputRef.current.click();
  }

  function handleGetFile(event: ChangeEvent<HTMLInputElement>): void {
    const files = event.target.files;

    if (files && onGetFile) onGetFile(files[0]);
    else if (onGetFile) onGetFile(null);
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
      />

      <button
        type='button'
        onClick={handleOpenExplorer}
        className='flex flew-row w-64 sm:w-96 h-[4.5rem] justify-center items-center px-5 gap-2 bg-white ring-1 ring-primary rounded-lg cursor-pointer hover:opacity-90 transition-colors duration-300'
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
