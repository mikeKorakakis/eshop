'use client'
import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';
import React, { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LINKS, SHOP_ENABLED } from '@/lib/constants';
import engine from '@/assets/images/tuning/engine.webp';
import ecu from '@/assets/images/tuning/ecu.webp';
import suspension from '@/assets/images/tuning/suspension.webp';
import preparation from '@/assets/images/services/ant.jpg';
import dynometer from '@/assets/images/services/dyno3.jpg';
import storage from '@/assets/images/services/storage2.jpg';
import support from '@/assets/images/services/pit.jpg';
import track_days from '@/assets/images/services/trackdays.jpg';
import transport from '@/assets/images/services/truck.jpg';
// import { useTranslation } from 'next-i18next';
// import UserNav from '../UserNav';
// import { Searchbar } from '@components/common'
import { Dictionary } from '@/lib/get-dictionary';
import { usePathname, useRouter } from 'next/navigation';
import { i18n } from '@/i18n-config'

const {
  link_services_dyno,
  link_services_racing_preparation,
  link_services_racing_support,
  link_services_storage,
  link_services_trackdays,
  link_services_transportation,
  link_tuning_electronics,
  link_tuning_suspension,
  link_tuning_engine,
  link_contact,
  link_search
} = LINKS;

interface Props {
  //   setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dictionary: Dictionary;
}

export default function NavigationClient({ dictionary }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const locales = i18n.locales.map((locale) => locale) as string[];
  const isRoot = pathname === '/' || locales.some(loc => pathname === "/" + loc);
  const common_dictionary = dictionary.common;
  const testPath = pathname?.split("#")[0] || "";
  const navigation = {
    // categories: [],
    categories: [
      {
        name: common_dictionary.menu_services,
        tag: 'services',
        featured: [
          {
            name: common_dictionary.menu_services_race_prep,
            href: link_services_racing_preparation,
            imageSrc: preparation,
            imageAlt: common_dictionary.menu_services_race_prep
          },
          {
            name: common_dictionary.menu_services_race_support,
            href: link_services_racing_support,
            imageSrc: support,
            imageAlt: common_dictionary.menu_services_race_support
          },
          {
            name: common_dictionary.menu_services_dyno,
            href: link_services_dyno,
            imageSrc: dynometer,
            imageAlt: common_dictionary.menu_services_dyno
          },
          {
            name: common_dictionary.menu_services_storage,
            href: link_services_storage,
            imageSrc: storage,
            imageAlt: common_dictionary.menu_services_storage
          },
          {
            name: common_dictionary.menu_services_transportation,
            href: link_services_transportation,
            imageSrc: transport,
            imageAlt: common_dictionary.menu_services_transportation
          },
          {
            name: common_dictionary.menu_services_trackdays,
            href: link_services_trackdays,
            imageSrc: track_days,
            imageAlt: common_dictionary.menu_services_trackdays
          }
        ]
      },
      {
        name: common_dictionary.menu_tuning,
        tag: 'tuning',
        featured: [
          {
            name: common_dictionary.menu_tuning_engine,
            href: link_tuning_engine,
            imageSrc: engine,
            imageAlt: common_dictionary.menu_tuning_engine
          },
          {
            name: common_dictionary.menu_tuning_suspension,
            href: link_tuning_suspension,
            imageSrc: suspension,
            imageAlt: common_dictionary.menu_tuning_suspension
          },
          {
            name: common_dictionary.menu_tuning_electronics,
            href: link_tuning_electronics,
            imageSrc: ecu,
            imageAlt: common_dictionary.menu_tuning_electronics
          }
        ]
      }
    ],
    pages: SHOP_ENABLED
      ? [
          { name: common_dictionary.menu_shop, href: link_search, tag: 'search' },
          { name: common_dictionary.menu_contact, href: link_contact, tag: 'contact' }
        ]
      : [
          //   { name: common_dictionary.menu_home, href: '/' },
          //   { name: common_dictionary.menu_about, href: '/' },
          //   { name: common_dictionary.menu_products, href: '/' },
          { name: common_dictionary.menu_contact, href: link_contact, tag: 'contact' }
        ]
  };
  return (
    <Popover.Group className="inset-x-0 bottom-0 px-4">
      <div className="flex h-full justify-center space-x-8">
        {navigation.categories &&
          navigation.categories.map((category) => (
            <Popover key={category?.name} className="flex">
              {({ open }) => (
                <>
                  <div className="relative flex">
                    <Popover.Button
                      className={clsx(
                        'relative z-10 flex items-center justify-center text-sm font-medium transition-colors duration-200 ease-out hover:border-b border-red-500',
                        isRoot ? 'text-white' : 'text-black',
                        testPath.includes(category.tag) && "border-b-2 border-red-500"
                        // isRoot ? 'text-white' : 'text-black'
                      )}
                    >
                      {category?.name}
                      <span
                        className={clsx(
                          open ? '' : '',
                          'absolute inset-x-0 -bottom-px h-0.5 transition duration-200 ease-out'
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                      {({ close }) => (
                        <>
                          <div
                            className="absolute inset-0 top-1/2 bg-white shadow"
                            aria-hidden="true"
                          />

                          <div className="relative bg-white">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                              <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                                {category.featured.map((item) => (
                                  <div key={item.name} className="group relative">
                                    <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                                      <Image
                                        src={item.imageSrc}
                                        alt={item.imageAlt}
                                        width={500}
                                        height={500}
                                        className="object-cover object-center"
                                        priority
                                      />
                                    </div>
                                    <div
                                      onClick={() => {
                                        close();
                                          router.push(item.href);
                                      }}
                                      className="mt-4 block font-medium text-gray-900"
                                    >
                                      <span className="absolute inset-0 z-10" aria-hidden="true" />
                                      {item.name}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          ))}

        {navigation.pages.map((page) => (
          <Link
            key={page.name}
            href={page.href}
            className={clsx(
              'flex items-center text-sm font-medium hover:border-b border-red-500 ',
              isRoot ? 'text-white' : 'text-black',
              testPath.includes(page.tag) && "border-b-2 border-red-500"
            )}
          >
            {page.name}
          </Link>
        ))}
      </div>
    </Popover.Group>
  );
}
