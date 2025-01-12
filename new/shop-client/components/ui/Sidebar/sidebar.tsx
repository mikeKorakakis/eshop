'use client';
import cn from 'clsx';
// import s from './sidebar.module.css';
import { Fragment, useEffect, useRef } from 'react';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { Dialog, Transition } from '@headlessui/react';
import { useUI } from '../ui-context';
interface SidebarProps {
  children: any;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ children, onClose }) => {
  const { displaySidebar } = useUI();
 
  return (
      <>
          <Transition
            appear={displaySidebar}
            show={displaySidebar}
          >
            <Dialog onClose={onClose} className="relative z-50">
              <Transition.Child
                as={Fragment}
                enter="transition-all ease-in-out duration-300"
                enterFrom="opacity-0 backdrop-blur-none"
                enterTo="opacity-100 backdrop-blur-[.5px]"
                leave="transition-all ease-in-out duration-200"
                leaveFrom="opacity-100 backdrop-blur-[.5px]"
                leaveTo="opacity-0 backdrop-blur-none"
              >
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
              </Transition.Child>
              <Transition.Child
                as={Fragment}
                enter="transition-all ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition-all ease-in-out duration-200"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80  text-black backdrop-blur-xl dark:border-neutral-700 dark:bg-black/80 dark:text-white md:w-[390px]">
                      {children}
                </Dialog.Panel>
              </Transition.Child>
            </Dialog>
          </Transition>
      </>
  );
};

export default Sidebar;
