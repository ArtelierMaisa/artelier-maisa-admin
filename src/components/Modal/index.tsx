import { memo } from 'react';
import ReactModal from 'react-modal';

import { ModalProps } from '../../@types';

function Modal(props: ModalProps) {
  const { children, isOpen, className = '', onRequestClose } = props;

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnEsc
      ariaHideApp={false}
      overlayClassName='fixed inset-0 bg-text50 border-none z-50'
      className={`flex flex-col w-full h-screen justify-center items-center ${className}`}
    >
      {children}
    </ReactModal>
  );
}

export default memo(Modal);
