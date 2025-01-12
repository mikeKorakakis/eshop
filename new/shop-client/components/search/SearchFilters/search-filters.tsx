import { Dispatch, Fragment, ReactNode, SetStateAction, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
// import type {
//   SearchPropsType,
// } from '@lib/search-props'
//import {Button} from '@components/ui'
import SearchInput from './search-input';
import { Collection, Facet } from '@/lib/vendure/generated/graphql-shop';
import { Dictionary } from '@/lib/get-dictionary';
import SearchPrice from './search-price';
import SearchSort from './search-sort';
import SearchCollection from './search-collection';
import SearchFacets from './search-facets';

interface Props {
  categories: Collection[];
  collection: string | undefined;
  facets: Facet[];
  f: string[];
  q: string | undefined;
  minPT: number;
  maxPT: number;
  searchResMaxPrice: number;
  dictionary: Dictionary;
  sort: string | undefined;
  children?: ReactNode;
  selectedFilters: string[];
  setSelectedFilters: Dispatch<SetStateAction<string[]>>;
  selectedCollection: string;
  setSelectedCollection: Dispatch<SetStateAction<string>>;
  setSkip: Dispatch<SetStateAction<number>>;
}

export default function SearchFilters({
  categories,
  facets,
  f,
  q,
  collection,
  children,
  sort,
  minPT,
  maxPT,
  searchResMaxPrice,
  dictionary,
  selectedFilters,
  setSelectedFilters,
  selectedCollection,
  setSelectedCollection,
  setSkip
}: Props) {
  const common_dictionary = dictionary.common;
  const search_dictionary = dictionary.search;
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div className="">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden  " onClose={setMobileFiltersOpen}>
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
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto  bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      {common_dictionary.filters}
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md  p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <div className="mt-4 border-t border-gray-200 bg-white">
                    <h3 className="sr-only">Categories</h3>

                    <SearchInput q={q} dictionary={dictionary} setSkip={setSkip} />
                    <div className="my-4 px-4">
                      <SearchPrice
                        searchResMaxPrice={searchResMaxPrice}
                        minPriceTax={minPT}
                        maxPriceTax={maxPT}
                        dictionary={dictionary}
                        setSkip={setSkip}
                      />
                    </div>
                    
                    <ul role="list" className="pb-3 text-sm font-medium text-gray-900">
                      <SearchCollection
                        dictionary={dictionary}
                        collection={collection}
                        categories={categories}
                        selectedCollection={selectedCollection}
                        setSelectedCollection={setSelectedCollection}
                        setSkip={setSkip}
                      />
                    </ul>

                    {/* <SearchFacets
                      f={f}
                      facets={facets}
                      selectedFilters={selectedFilters}
                      setSelectedFilters={setSelectedFilters}
                    /> */}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-baseline justify-between border-b border-gray-200 pb-6 pt-12 sm:flex-row">
            <h1 className="w-full pb-2 text-center text-2xl font-bold tracking-tight text-gray-900 sm:pb-0  sm:text-left">
              {search_dictionary.search_results}
            </h1>

            <SearchSort
              sort={sort}
              dictionary={dictionary}
              setMobileFiltersOpen={setMobileFiltersOpen}
              setSkip={setSkip}
            />
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              {search_dictionary.products}
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 ">
              {/* Filters */}
              <div className="hidden lg:block">
                <h3 className="sr-only">{search_dictionary.categories}</h3>

                <SearchInput q={q} dictionary={dictionary} setSkip={setSkip} />
                <div className="mb-6 mt-4">
                  <SearchPrice
                    searchResMaxPrice={searchResMaxPrice}
                    minPriceTax={minPT}
                    maxPriceTax={maxPT}
                    dictionary={dictionary}
                    setSkip={setSkip}
                  />
                </div>
                <ul role="list" className="  pb-2 text-sm font-medium text-gray-900">
                  <SearchCollection
                    dictionary={dictionary}
                    collection={collection}
                    categories={categories}
                    selectedCollection={selectedCollection}
                    setSelectedCollection={setSelectedCollection}
                    setSkip={setSkip}
                  />
                </ul>
                <SearchFacets
                  f={f}
                  facets={facets}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  setSkip={setSkip}
                />
              
              </div>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {children}
                {/* <div className="h-96 rounded-lg border-4 border-dashed border-gray-200 lg:h-full" /> */}
                {/* /End replace */}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

// const PriceSliderSkeleton = () => {
//   return (
//     <div className="h-18">
//       <div className="mb-4 h-4 w-full animate-pulse rounded-md bg-zinc-200"></div>
//       <div className="h-12 w-full animate-pulse rounded-md bg-zinc-200"></div>
//     </div>
//   );
// };
