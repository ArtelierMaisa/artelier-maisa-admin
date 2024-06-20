import { useState } from 'react';

import {
  ProductModalActiveType,
  ProductModalDataProps,
  ProductModalProps,
} from '../../@types';
import { Modal } from '../Modal';
import { Details } from './Details';
import { Intro } from './Intro';
import { Photos } from './Photos';

export function ProductModal(props: ProductModalProps) {
  const { isOpen, variant, data, onAdd, onClose } = props;

  const [product, setProduct] = useState<ProductModalDataProps | undefined>(
    data,
  );
  const [currentModalContent, setCurrentModalContent] =
    useState<ProductModalActiveType>('intro');

  const commonModalContentProps = {
    variant,
    data: product,
    onClose,
  };

  const modalContents: Record<ProductModalActiveType, React.JSX.Element> = {
    details: (
      <Details
        onGoBack={() => setCurrentModalContent('intro')}
        onContinue={detailsData => {
          setProduct({ ...product!, ...detailsData });
          setCurrentModalContent('photos');
        }}
        {...commonModalContentProps}
      />
    ),
    intro: (
      <Intro
        onContinue={introData => {
          setProduct({ ...product!, ...introData });
          setCurrentModalContent('details');
        }}
        {...commonModalContentProps}
      />
    ),
    photos: (
      <Photos
        variant={variant}
        data={data?.images}
        onClose={onClose}
        onAdd={photosData => {
          setProduct({ ...product!, ...photosData });
          if (onAdd) onAdd();
        }}
        onGoBack={() => setCurrentModalContent('details')}
      />
    ),
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      {modalContents[currentModalContent]}
    </Modal>
  );
}
