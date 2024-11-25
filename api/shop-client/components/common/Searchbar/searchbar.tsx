'use client';
import { ChangeEvent, FC, memo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Combobox, Dialog, Transition } from '@headlessui/react';
// import { useTranslation } from 'next-i18next';
// import useSearch from '@framework/product/use-search'; muse_fix_framework
import { useDebounce } from '@/lib/use-debounce';
import clsx from 'clsx';
import Spinner from '@/components/ui/Spinner';
import Image from 'next/image';
// import { Product } from '@commerce/types/product' must_fix_type
import { cloudinaryImageLoader } from '@/lib/cloudinary-image-loader';
import { Dictionary } from '@/lib/get-dictionary';
// import { Product } from '@/lib/types';

interface Props {
  openSearch: boolean;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
  dictionary: Dictionary;
}

const Searchbar: FC<Props> = ({ openSearch = false, setOpenSearch, dictionary }) => {
  const router = useRouter();
//   const { locale } = router.query;
  const [products, setProducts] = useState<
  any //Product[]  must_fix_type
  | undefined>([]);

  const [query, setQuery] = useState('');
//   const { t } = useTranslation('common');
    const common_dictionary = dictionary.common;
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event?.target?.value);
  };

  const searchQuery = useDebounce(query, 1000);

//   const { data, isLoading } = useSearch({
//     search: searchQuery.toString(),
//     skip: 0,
//     take: 10,
//     excludeMaxPrice: true
//   }); must_fix_framework

    const isLoading = false;
    const data = {products: [{id: 1, name: 'test', path: 'test', images: [{url: 'test'}]}]};

  //   const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //     e.preventDefault()

  //     if (e.key === 'Enter' && query !== '') {
  //       //   const q = e.currentTarget.value
  //       if (query.length < 3) {
  //         toast.error(common_dictionary.longer_3'))
  //       } else {
  //         router.push(
  //           {
  //             pathname: `/search`,
  //             query: { ...routerQuery, q: query },
  //           },
  //           undefined,
  //           { shallow: true }
  //         )
  //         setOpenSearch(false)
  //       }
  //     }
  //   }

  //   const handleClick = () => {
  //     if (query.length < 3) {
  //       toast.error(common_dictionary.longer_3'))
  //     } else {
  //       router.push(
  //         {
  //           pathname: `/search`,
  //           query: { ...routerQuery, q: query },
  //         },
  //         undefined,
  //         { shallow: true }
  //       )
  //       setOpenSearch(false)
  //     }
  //   }

  const productRes = data?.products;
//   useEffect(() => {
//     if (productRes === undefined) return;
//     if (searchQuery && !isLoading) setProducts(productRes);
//     else setProducts([]);
//   }, [productRes, isLoading, searchQuery]);

  return (
    <Transition.Root show={openSearch} as={Fragment} afterLeave={() => setQuery('')} appear>
      <Dialog as="div" className="relative z-20 " onClose={setOpenSearch}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 top-20 z-20 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox>
                {/* </Combobox> onChange={(person) => (window.location = person.url)}> */}
                <div className="relative">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                    // onClick={handleClick}
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                    placeholder={`${common_dictionary.search}...`}
                    onChange={changeHandler}
                    // onKeyUp={handleKeyUp}
                  />
                  {isLoading && (
                    <div className="absolute right-4 top-3">
                      {' '}
                      <Spinner />
                    </div>
                  )}
                </div>

                {searchQuery !== '' && products && products?.length > 0 && (
                  <Combobox.Options
                    static
                    className=" scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
                  >
                    {searchQuery !== '' &&
                      products?.map((product: any) => ( // Product must_fix_type
                        <Transition
                          key={product.id}
                          appear={true}
                          enter="transition duration-1000 ease-out"
                          enterFrom="transform opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-1000 ease-out"
                          leaveFrom="transform opacity-100"
                          leaveTo="transform  opacity-0"
                        >
                          <Combobox.Option
                            onClick={() => {
                              router.push(`/product/${product.path}`);
                              setOpenSearch(false);
                            }}
                            key={product.id}
                            value={product}
                            className={({ active }) =>
                              clsx(
                                'cursor-pointer select-none px-4 py-2',
                                active && 'bg-red-600 text-white'
                              )
                            }
                          >
                            <div className="inline-flex items-center">
                              <Image
                                loader={cloudinaryImageLoader}
                                src={product.images[0].url}
                                alt="Empty cart"
                                width={64}
                                height={64}
                                className="mr-2 h-16 w-16  "
                              />
                              {product.name}
                            </div>
                          </Combobox.Option>
                        </Transition>
                      ))}
                  </Combobox.Options>
                )}

                {searchQuery !== '' && products?.length === 0 && (
                  <p className="p-4 text-sm text-gray-500">{common_dictionary.no_results}</p>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>

    // <div className={cn(s.root, className)}>
    //   <label className="hidden" htmlFor={id}>
    //     Search
    //   </label>
    //   <input
    //     id={id}
    //     className={s.input}
    //     placeholder="Search for products..."
    //     defaultValue={router.query.q}
    //     onKeyUp={handleKeyUp}
    //   />
    //   <div className={s.iconContainer}>
    //     <svg className={s.icon} fill="currentColor" viewBox="0 0 20 20">
    //       <path
    //         fillRule="evenodd"
    //         clipRule="evenodd"
    //         d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
    //       />
    //     </svg>
    //   </div>
    // </div>
  );
};

export default memo(Searchbar);
