import React from 'react';
import Image from 'next/image';
import brand1 from '@/assets/images/companies/aim_.png';
import brand2 from '@/assets/images/companies/ducabike_.png';
import brand3 from '@/assets/images/companies/mwr_.png';
import brand4 from '@/assets/images/companies/pvm_.png';
import brand5 from '@/assets/images/companies/starlane_.png';
// import brand6 from '@assets/images/companies/aim_.png'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll/animate-on-scroll';
import { Dictionary } from '@/lib/get-dictionary';

type Props = {
  dictionary: Dictionary;
}

const categories = [
  {
    name: '',
    href: 'https://zenone.car.gr/parts/?category=30&dsite=1&pg=1&q=aim&uid=6329',
    imageSrc: brand1
  },
  {
    name: '',
    href: 'https://zenone.car.gr/parts/?category=30&dsite=1&pg=1&q=ducabike&uid=6329',
    imageSrc: brand2
  },
  {
    name: '',
    href: 'https://zenone.car.gr/parts/?category=30&dsite=1&pg=1&q=mwr&uid=6329',
    imageSrc: brand3
  },
  {
    name: '',
    href: 'https://zenone.car.gr/parts/?category=30&dsite=1&pg=1&q=pvm&uid=6329',
    imageSrc: brand4
  },
  {
    name: '',
    href: 'https://zenone.car.gr/parts/?category=30&dsite=1&pg=1&q=starlane&uid=6329',
    imageSrc: brand5
  }
];

export default async function BrandsSection({ dictionary }: Props) {
   const home_dictionary = dictionary.home;
  return (
    <section
      aria-labelledby="category-heading"
      className="pt-24 sm:pt-32 xl:mx-auto xl:max-w-7xl xl:px-8"
    >
      <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
        <h2 id="category-heading" className="text-2xl font-bold tracking-tight text-gray-900">
          {home_dictionary.brands_header}
        </h2>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://zenone.car.gr/parts"
          className="hidden text-sm font-semibold text-red-600 hover:text-red-500 sm:block"
        >
          {home_dictionary.brands_link}
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>

      <div className="mt-4 flow-root">
        <div className="-my-2">
          <div className="scrollbar-hide relative box-content h-80 overflow-x-auto overflow-y-hidden py-2 xl:overflow-visible">
            <div className=" min-w-screen-xl absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
              {categories.map((category, i) => (
                <AnimateOnScroll key={i}>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    key={i}
                    href={category.href}
                    className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 shadow-lg transition ease-in-out hover:-translate-y-1 hover:scale-105 hover:opacity-75 xl:w-auto"
                  >
                    <span aria-hidden="true" className="absolute inset-0 bg-gray-200 ">
                      <Image
                        width={500}
                        height={500}
                        src={category.imageSrc}
                        alt=""
                        className="h-full w-full object-contain object-center  p-4 grayscale hover:grayscale-0"
                      />
                    </span>
                    {/* <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-full bg-gray-800 opacity-30 z-0 "
                    // className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                  />
                  <span className="relative mt-auto text-center text-xl font-bold text-white">
                    {category.name}
                  </span> */}
                  </a>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 px-4 sm:hidden">
        <a
          href="https://zenone.car.gr/parts"
          target="_blank"
          rel="noreferrer"
          className="block text-sm font-semibold text-red-600 hover:text-red-500"
        >
          {home_dictionary.brands_link}
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>
    </section>
  );
}
