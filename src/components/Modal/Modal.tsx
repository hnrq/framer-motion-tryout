import { ReactNode, FC, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import { ReactComponent as CloseIcon } from 'assets/close.svg';

interface ModalProps {
  children: ReactNode;
};

const modalRoot = document.getElementById('modal-root');

const Modal: FC<ModalProps> = ({ children }) => { 
  const history = useHistory();
  const [showModal, setShowModal] = useState(true);

  return modalRoot && createPortal(
    <AnimatePresence onExitComplete={() => history.goBack()}>
      {showModal && (
        <div className="fixed w-full h-full z-10 flex">
          <motion.div 
            className="w-full h-full bg-gray-700 bg-opacity-70 absolute cursor-pointer"
            onClick={() => setShowModal(false)}
            initial={{ opacity: 0 }}
            transition={{ ease: 'easeInOut' }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div 
            className="content z-20 m-auto relative"
            initial={{opacity: 0, y: 50}}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <CloseIcon 
              className="absolute w-5 right-0 mt-4 mr-7 cursor-pointer" 
              onClick={() => setShowModal(false)}
            />
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    modalRoot
  );
}

export default Modal;