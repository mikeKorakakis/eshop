import React from 'react';
import engine from '@/assets/images/tuning/engine.webp';
import ecu from '@/assets/images/tuning/ecu.webp';
import suspension from '@/assets/images/tuning/suspension.webp';
import Image from 'next/image';
import { LINKS } from '@/lib/constants';
import Link from 'next/link';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll/animate-on-scroll';
import { Dictionary } from '@/lib/get-dictionary';

interface Props {
  dictionary: Dictionary;
}

const { link_tuning_engine, link_tuning_suspension, link_tuning_electronics } = LINKS;

export default async function TuningSection({ dictionary }: Props) {
  const home_dictionary = dictionary.home;
  const collections = [
    {
      name: home_dictionary.tuning_engine,
      href: link_tuning_engine,
      imageSrc: engine,
      imageAlt: home_dictionary.tuning_engine
    },
    {
      name: home_dictionary.tuning_suspension,
      href: link_tuning_suspension,
      imageSrc: suspension,
      imageAlt: home_dictionary.tuning_suspension
    },
    {
      name: home_dictionary.tuning_electronics,
      href: link_tuning_electronics,
      imageSrc: ecu,
      imageAlt: home_dictionary.tuning_electronics
    }
  ];

  return (
    <section
      aria-labelledby="collection-heading"
      className="mx-auto max-w-xl px-4 pt-12 sm:px-6 sm:pt-32 lg:max-w-7xl lg:px-8"
    >
      <h2 id="collection-heading" className="text-2xl font-bold tracking-tight text-gray-900">
        {home_dictionary.tuning_header}
      </h2>
      <p className="mt-4 text-base text-gray-500">{home_dictionary.tuning_subHeader}</p>

      <div className="mt-10 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
        {collections.map((collection) => (
          <AnimateOnScroll key={collection.name}>
            <Link href={collection.href} className="group block">
              <div
                aria-hidden="true"
                //   className="overflow-hidden rounded-lg group-hover:opacity-75 "
                className="aspect-h-4 aspect-w-6 overflow-hidden rounded-lg lg:aspect-h-4 lg:aspect-w-6 group-hover:opacity-75"
              >
                <Image
                  width={500}
                  height={500}
                  src={collection.imageSrc}
                  alt={collection.imageAlt}
                  className="h-full w-full object-fill object-center transition duration-500 ease-in-out hover:scale-110"
                />
              </div>
              <h3 className="mt-4 text-center text-base font-semibold text-gray-900">
                {collection.name}
              </h3>
              {/* <p className="mt-2 my-4 text-sm text-gray-500">
              {collection.description}
            </p> */}
            </Link>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}
