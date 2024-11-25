'use client';
import { FC, useRef, ReactNode, Fragment } from 'react';
import s from './modal.module.css';
import FocusTrap from '@/lib/focus-trap';
import { Cross } from '@/components/icons';
import { Dialog, Transition } from '@headlessui/react';
import { useUI } from '../context';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ children, onClose }) => {
  const { displayModal } = useUI();
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;



//   const handleKey = useCallback(
//     (e: KeyboardEvent) => {
//       if (e.key === 'Escape') {
//         return onClose();
//       }
//     },
//     [onClose]
//   );

//   useEffect(() => {
//     const modal = ref.current;

//     if (modal) {
//       disableBodyScroll(modal, { reserveScrollBarGap: true });
//       window.addEventListener('keydown', handleKey);
//     }
//     return () => {
//       clearAllBodyScrollLocks();
//       window.removeEventListener('keydown', handleKey);
//     };
//   }, [handleKey]);

  return (
      <Transition appear show={displayModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  {/* <div className={s.modal} role="dialog"> */}
                    <div className={s.modal} role="dialog" ref={ref}>
                    <button onClick={() => onClose()} aria-label="Close panel" className={s.close}>
                      <Cross className="h-6 w-6" />
                    </button>
                    <FocusTrap focusFirst>{children}</FocusTrap>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    // </div>
  );
};

export default Modal;
