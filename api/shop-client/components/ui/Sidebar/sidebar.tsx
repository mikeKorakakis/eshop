'use client';
import cn from 'clsx';
// import s from './sidebar.module.css';
import { Fragment, useEffect, useRef } from 'react';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { Dialog, Transition } from '@headlessui/react';
import { useUI } from '../context';
interface SidebarProps {
  children: any;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ children, onClose }) => {
  const { displaySidebar } = useUI();
 
  return (
    // <div className={cn(s.root)} ref={sidebarRef} onKeyDown={onKeyDownSidebar} tabIndex={1}>
      <>
        {/* <div className={s.backdrop} onClick={onClose} /> */}
        {/* <section className="absolute inset-y-0 right-0 flex w-full max-w-full outline-none md:w-auto md:pl-10"> */}
          <Transition
            appear={displaySidebar}
            show={displaySidebar}
            // enter="transform transition ease-in-out duration-500"
            // enterFrom="translate-x-[28rem]"
            // enterTo="translate-x-0"
            // leave="transform transition ease-in-out duration-500"
            // leaveFrom="translate-x-0"
            // leaveTo="translate-x-[28rem]"
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
                  {/* <div className="h-full w-screen md:max-w-md"> */}
                    {/* <div className={s.sidebar}> */}
                      {/* <div className={s.sidebar} ref={contentRef}> */}
                      {children}
                    {/* </div> */}
                  {/* </div> */}
                </Dialog.Panel>
              </Transition.Child>
            </Dialog>
          </Transition>
        {/* </section> */}
      </>
    // </div>
  );
};

export default Sidebar;
