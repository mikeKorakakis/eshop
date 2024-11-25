import React, { FC, ReactNode } from 'react';
import cn from 'clsx';
import s from './sidebar-layout.module.css';
import { ChevronLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Dictionary } from '@/lib/get-dictionary';

type ComponentProps = { className?: string; children?: ReactNode; dictionary: Dictionary } & (
  | { handleClose: () => any; handleBack?: never }
  | { handleBack: () => any; handleClose?: never }
);

const SidebarLayout: FC<ComponentProps> = ({
  children,
  className,
  handleBack,
  handleClose,
  dictionary
}) => {
  const common_dictionary = dictionary.common;
  return (
    <div className={cn(s.root, className)}>
      <header className={s.header}>
        {handleClose && (
          <button
            onClick={handleClose}
            aria-label="Close"
            className="mr-6 flex items-center transition duration-150 ease-in-out hover:text-zinc-200 focus:outline-none"
          >
            <XMarkIcon className="h-6 w-6 hover:text-zinc-400" />
            <span className="ml-2 text-sm text-zinc-800 ">{common_dictionary.close}</span>
          </button>
        )}
        {handleBack && (
          <button
            onClick={handleBack}
            aria-label="Go back"
            className="flex items-center transition duration-150 ease-in-out hover:text-zinc-200 focus:outline-none"
          >
            <ChevronLeftIcon className="h-6 w-6 hover:text-zinc-400" />
            <span className="ml-2 text-xs text-zinc-800">{common_dictionary.back}</span>
          </button>
        )}
      </header>
      < >{children}</>
    </div>
  );
};

export default SidebarLayout;
