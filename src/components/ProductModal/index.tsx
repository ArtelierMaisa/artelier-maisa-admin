import { useState } from 'react';

import { ProductModalActiveType, ProductModalProps } from '../../@types';
import { Modal } from '../Modal';
import { Details } from './Details';
import { Intro } from './Intro';
import { Photos } from './Photos';

export function ProductModal(props: ProductModalProps) {
  const { isOpen, variant, data, onAdd, onClose } = props;

  console.log(data);

  // TODO: This state should be used by the component to manager the product data when is edited or added.
  // const [product, setProduct] = useState()
  const [currentModalContent, setCurrentModalContent] =
    useState<ProductModalActiveType>('intro');

  const commonModalContentProps = {
    variant,
    data,
    onClose,
  };

  const modalContents: Record<ProductModalActiveType, React.JSX.Element> = {
    details: (
      <Details
        onGoBack={() => setCurrentModalContent('intro')}
        onContinue={() => setCurrentModalContent('photos')}
        {...commonModalContentProps}
      />
    ),
    intro: (
      <Intro
        onContinue={() => setCurrentModalContent('details')}
        {...commonModalContentProps}
      />
    ),
    photos: (
      <Photos
        variant={variant}
        data={data?.images}
        onClose={onClose}
        onAdd={() => onClose && onClose()}
        onGoBack={() => setCurrentModalContent('details')}
      />
    ),
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose || onAdd}>
      {modalContents[currentModalContent]}
    </Modal>
  );
}
