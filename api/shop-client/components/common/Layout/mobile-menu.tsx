'use client';
import { Dialog, Tab, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Fragment } from 'react';
import Image from 'next/image';
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
import { useRouter } from 'next/navigation';
import { Dictionary } from '@/lib/get-dictionary';
import { useUI } from '../../ui/context';

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
  link_search,
  link_contact
} = LINKS;

interface Props {
  dictionary: Dictionary;
}
// const currencies = ['CAD', 'USD', 'AUD', 'EUR', 'GBP']
const MobileMenu = ({ dictionary }: Props) => {
  const { displayMobileMenu, openMobileMenu, closeMobileMenu } = useUI();

  const common_dictionary = dictionary.common;
  const router = useRouter();
  const navigation = {
    // categories: [],
    categories: [
      {
        name: common_dictionary.menu_services,
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
    pages: [
      //   { name: common_dictionary.menu_home, href: '/' },
      //   { name: common_dictionary.menu_about, href: '/' },
      //   { name: common_dictionary.menu_products, href: '/' },
      { name: common_dictionary.menu_contact, href: link_contact }
    ]
  };

  return (
    <Transition.Root show={displayMobileMenu} as={Fragment}>
      <Dialog as="div" className="relative z-40 lg:hidden" onClose={closeMobileMenu}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
              <div className="flex px-4 pb-2 pt-5">
                <button
                  type="button"
                  className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  onClick={closeMobileMenu}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Links */}
              <Tab.Group as="div" className="mt-2">
                <div className="overflow-auto border-b border-gray-200">
                  <Tab.List className=" flex space-x-8 px-4">
                    {navigation.categories &&
                      navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            clsx(
                              selected
                                ? 'border-red-600 text-red-600'
                                : 'border-transparent text-gray-900',
                              'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                  </Tab.List>
                </div>
                <Tab.Panels as={Fragment}>
                  {navigation.categories &&
                    navigation.categories.map((category) => (
                      <Tab.Panel key={category.name} className="space-y-12 px-4 py-4">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                          {category.featured.map((item) => (
                            <div key={item.name} className="group relative cursor-pointer">
                              <div className=" aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                                <Image
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  className="object-cover object-center "
                                />
                              </div>
                              <div
                                onClick={() => {
                                  openMobileMenu();
                                  router.push(item.href);
                                }}
                                // href={item.href}
                                className="mt-6 block text-sm font-medium text-gray-900"
                              >
                                <span className="absolute inset-0 z-10" aria-hidden="true" />
                                {item.name}
                              </div>
                              {/* <p
                                aria-hidden="true"
                                className="mt-1 text-sm text-gray-500"
                              >
                                Shop now
                              </p> */}
                            </div>
                          ))}
                        </div>
                      </Tab.Panel>
                    ))}
                </Tab.Panels>
              </Tab.Group>

              {SHOP_ENABLED && (
                <div className="space-y-6 border-t border-gray-200 px-4 py-4">
                  <div className="flow-root">
                    <div
                      onClick={() => {
                        openMobileMenu();
                        router.push(link_search);
                      }}
                      //   href={link_search}
                      className="-m-2 block cursor-pointer p-2 font-medium text-gray-900"
                    >
                      {common_dictionary.shop}
                    </div>
                  </div>
                  {/* <div className="flow-root">
                        <Link
                          href="#"
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Sign in
                        </Link>
                      </div> */}
                </div>
              )}
              <div className="space-y-6 border-t border-gray-200 px-4 py-4">
                {navigation.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <div
                      onClick={() => {
                        openMobileMenu();
                        router.push(page.href);
                      }}
                      // href={page.href}
                      className="-m-2 block cursor-pointer p-2 font-medium text-gray-900"
                    >
                      {page.name}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                {/* Currency selector */}
                {/* <I18nWidget /> */}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default MobileMenu;
