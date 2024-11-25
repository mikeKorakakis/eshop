import React, { ReactNode } from 'react';
import Logo from '@/components/ui/Logo';
import { Dictionary } from '@/lib/get-dictionary';
import I18nWidget from '@/components/common/I18nWidget';
import { PhoneIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import UserNav from '../UserNav';
import { i18n } from '@/i18n-config'
import { Order } from '@/lib/vendure/generated/graphql-shop';


interface Props {
  //   setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dictionary: Dictionary;
  search: ReactNode;
  navigationClient: ReactNode;
  pathName: string;
  order: Order
}

export default async function Navigation({ dictionary, search, navigationClient, pathName, order }: Props) {

  const common_dictionary = dictionary.common;
//   const headersList = await headers();
//   // read the custom x-url header
//   const header_url = headersList.get('x-url') || "";
  const locales = i18n.locales.map((locale) => locale) as string[];
  const isRoot = pathName === '/' || locales.some(loc => pathName === "/" + loc);

  return (
    <header className="absolute z-20 w-full">
      <nav aria-label="Top">
        {/* Top navigation */}
        <div className="bg-gray-900">
          <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Currency selector */}
            <div></div>

            <div className="flex items-center space-x-2">
              <div className=" flex h-min space-x-1">
                <span className="mr-4 flex text-sm font-medium text-white hover:text-gray-100">
                  <PhoneIcon className="my-auto inline h-5 pr-2 text-sm font-medium text-white" />
                  <span className="w-fit">210-5561166, 210-6454563</span>
                </span>
              </div>

              <label htmlFor="desktop-currency" className="sr-only">
                Language
              </label>
              <I18nWidget />
              {/* {SHOP_ENABLED && (
                <>
                  <a
                    href="#"
                    className="text-sm font-medium text-white hover:text-gray-100"
                  >
                    Sign in
                  </a>
                  <a
                    href="#"
                    className="text-sm font-medium text-white hover:text-gray-100"
                  >
                    Create an account
                  </a>
                </>
              )} */}
            </div>
          </div>
        </div>

        {/* Secondary navigation */}
        <div className="bg-black bg-opacity-10 backdrop-blur-md backdrop-filter">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div>
              <div className="flex h-16 items-center justify-between">
                {/* Logo (lg+) */}
                <div className="hidden lg:flex lg:flex-1 lg:items-center">
                  <Logo />
                </div>

                <div className="hidden h-full space-x-4 lg:flex">
                  {/* Home menu link */}
                  <Link
                    href="/"
                    className={clsx(
                      'flex items-center text-sm font-medium hover:border-b border-red-500',
                      isRoot ? 'text-white border-b-2 border-red-500' : 'text-black'

                    )}
                  >
                    {common_dictionary.menu_home}
                  </Link>
                  {navigationClient}
                </div>

                {/* Mobile menu and search (lg-) SearchBar*/}
                {search}

                {/* Logo (lg-) */}
                <Logo className="lg:hidden" />
                <UserNav dictionary={dictionary} order={order}/>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
