import { Dictionary } from '@/lib/get-dictionary';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useState, useCallback, useEffect, Fragment, Dispatch, SetStateAction } from 'react';
import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid';

type Props = {
  dictionary: Dictionary;
  setMobileFiltersOpen: Dispatch<SetStateAction<boolean>>;
  sort: string | undefined;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
};

export default function SearchSort({ dictionary, setMobileFiltersOpen, sort }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  
  const search_dictionary = dictionary.search;
  const [selectedSort, setSelectedSort] = useState<string | undefined>(sort);

  const handleChangeSort = (value: string) => {
    setSelectedSort(value);
  };

  const sortOptions = [
    {
      name: search_dictionary.relative,
      value: '',
      selected: selectedSort === '' || selectedSort === undefined
    },
    {
      name: search_dictionary['name-asc'],
      value: 'name-asc',
      selected: selectedSort === 'name-asc'
    },
    {
      name: search_dictionary['name-desc'],
      value: 'name-desc',
      selected: selectedSort === 'name-desc'
    },
    {
      name: search_dictionary['price-asc'],
      value: 'price-asc',
      selected: selectedSort === 'price-asc'
    },
    {
      name: search_dictionary['price-desc'],
      value: 'price-desc',
      selected: selectedSort === 'price-desc'
    }
  ];

  const createQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    // params.delete('take')
    // params.delete('skip');
    selectedSort ? params.set('sort', selectedSort) : params.delete('sort');

    return params.toString();
  }, [searchParams, selectedSort]);

  useEffect(() => {
    router.push(pathname + '?' + createQueryString());
  }, [sort, createQueryString, pathname, router]);

  return (
    <div className="flex w-full items-center justify-end sm:w-min">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
            {search_dictionary.sort}
            <ChevronDownIcon
              className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md  bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {sortOptions.map((option, i) => (
                <Menu.Item key={i}>
                  {({ active }) => (
                    <div
                      onClick={() => handleChangeSort(option.value)}
                      //   href={option.href}
                      className={clsx(
                        'cursor-pointer',
                        option.selected
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'text-gray-500',
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm'
                        // option.selected && 'bg-gray-300'
                      )}
                    >
                      {option.name}
                    </div>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      {/* <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button> */}
      <button
        type="button"
        className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
        onClick={() => setMobileFiltersOpen(true)}
      >
        <span className="sr-only">Filters</span>
        <FunnelIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
