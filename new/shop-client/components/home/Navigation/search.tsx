'use client';
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import React, { useState } from 'react';
// import { useTranslation } from 'next-i18next';
import { usePathname } from 'next/navigation';
import Searchbar from '@/components/common/Searchbar';
// import { Searchbar } from '@components/common'
import { Dictionary } from '@/lib/get-dictionary';
import { useUI } from '@/components/ui/ui-context';
import { i18n } from '@/i18n-config';

type Props = {
  dictionary: Dictionary;
};

export default function Search({ dictionary }: Props) {
  const pathname = usePathname();
  const {openMobileMenu} = useUI()

  const locales = i18n.locales.map((locale) => locale) as string[];
  const isRoot = pathname === '/' || locales.some(loc => pathname === "/" + loc);
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <div className="flex flex-1 items-center lg:hidden">
      <div className="pb-4 lg:px-6 ">
        <Searchbar openSearch={openSearch} setOpenSearch={setOpenSearch} dictionary={dictionary} />
      </div>
      <button
        type="button"
        className={clsx('-ml-2 p-2', isRoot ? 'text-white' : 'text-black')}
        onClick={() => openMobileMenu()}
      >
        <span className="sr-only">Open menu</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      <button
        className={clsx('ml-2 p-2', isRoot ? 'text-white' : 'text-black')}
        onClick={() => setOpenSearch(true)}
      >
        <span className="sr-only">Search</span>
        <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
}
