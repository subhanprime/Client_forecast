import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

interface ModalProps {
  children?: ReactNode;
  visibility: boolean;
  closeModal: () => void;
  position?:1 | 2 | 3 | 4,
  place?:'top' | 'center' | 'end';
  width?:'small' | 'large'
}

function Modal({
  children, visibility, closeModal, position = 1, place = 'center', width = 'small',
}: ModalProps) {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Prevent the click event from reaching the outer div
    event.stopPropagation();
    closeModal();
  };

  const posStyle = {
    center: 'items-center',
    top: 'items-start pt-[80px]',
    end: 'items-end pb-[150px]',
  };

  if (!visibility) {
    return null;
  }

  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 / position }}
      onClick={handleClick}
      data-testid="modal"
      style={{ zIndex: 999 * position }}
      className={`fixed top-0 bottom-0 left-0 right-0 h-screen w-screen overflow-auto scrollbar bg-white/60 flex ${posStyle[place]}  justify-center`}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 / position, duration: 0.3 / position }}
        style={{ zIndex: 9999 * position }}
        className={`w-[80%]  ${width === 'small' ? 'md:w-[35%]' : 'md:w-[45%]'} shadow-xl rounded-md bg-white`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Stop propagation within the children */}
        {children}
      </motion.div>
    </motion.div>

  );
}

export default Modal;
