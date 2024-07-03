import { memo, useEffect, useState } from 'react';

import {
  ProductModalActiveType,
  ProductModalDataProps,
  ProductModalProps,
} from '../../@types';
import { Modal } from '../';
import Details from './Details';
import Intro from './Intro';
import Photos from './Photos';

function ProductModal(props: ProductModalProps) {
  const { isOpen, variant, data, isLoading = false, onAdd, onClose } = props;

  const [currentModalContent, setCurrentModalContent] =
    useState<ProductModalActiveType>('intro');
  const [product, setProduct] = useState<ProductModalDataProps | undefined>();

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
          if (variant === 'add') setCurrentModalContent('photos');
          else if (onAdd) onAdd({ ...product!, ...detailsData, files: [] });
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
        data={product?.images}
        isLoading={isLoading}
        onClose={onClose}
        onAdd={(images, files) => {
          if (onAdd) onAdd({ ...product!, images, files });
        }}
        onGoBack={() => setCurrentModalContent('details')}
      />
    ),
  };

  useEffect(() => {
    if (!isOpen) {
      setCurrentModalContent('intro');
      setProduct(undefined);
    } else if (data?.id && variant === 'edit') setProduct(data);
  }, [isOpen, variant, data]);

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      {modalContents[currentModalContent]}
    </Modal>
  );
}

export default memo(ProductModal);
