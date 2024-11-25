import React from 'react';
import preparation from '@/assets/images/services/ant.jpg';
import dynometer from '@/assets/images/services/dyno3.jpg';
import storage from '@/assets/images/services/storage2.jpg';
import support from '@/assets/images/services/pit.jpg';
import track_days from '@/assets/images/services/trackdays.jpg';
import transport from '@/assets/images/services/truck.jpg';
import Image from 'next/image';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll/animate-on-scroll';
import { LINKS } from '@/lib/constants';
import Link from 'next/link';
import { Dictionary } from '@/lib/get-dictionary';

interface Props {
  dictionary: Dictionary;
}

const {
  link_services_racing_preparation,
  link_services_racing_support,
  link_services_dyno,
  link_services_storage,
  link_services_transportation,
  link_services_trackdays
} = LINKS;

export default async function CollectionSection({ dictionary }: Props) {
  const home_dictionary = dictionary.home;
  const collections = [
    {
      id: 1,
      name: home_dictionary.services_race_prep,
      href: link_services_racing_preparation,
      imageSrc: preparation,
      imageAlt: home_dictionary.services_race_prep_descr,
      description: home_dictionary.services_race_prep_descr
    },
    {
      id: 2,
      name: home_dictionary.services_race_support,
      href: link_services_racing_support,
      imageSrc: support,
      imageAlt: home_dictionary.services_race_support,
      description: home_dictionary.services_race_support_descr
    },
    {
      id: 3,
      name: home_dictionary.services_dyno,
      href: link_services_dyno,
      imageSrc: dynometer,
      imageAlt: home_dictionary.services_dyno,
      description: home_dictionary.services_dyno_descr
    },
    {
      id: 4,
      name: home_dictionary.services_storage,
      href: link_services_storage,
      imageSrc: storage,
      imageAlt: home_dictionary.services_storage_descr,
      description: home_dictionary.services_storage_descr
    },
    {
      id: 5,
      name: home_dictionary.services_transportation,
      href: link_services_transportation,
      imageSrc: transport,
      imageAlt: home_dictionary.services_transportation_descr,
      description: home_dictionary.services_transportation_descr
    },
    {
      id: 6,
      name: home_dictionary.services_trackdays,
      href: link_services_trackdays,
      imageSrc: track_days,
      imageAlt: home_dictionary.services_trackdays_descr,
      description: home_dictionary.services_trackdays_descr
    }
  ];

  return (
    <section
      aria-labelledby="collection-heading"
      className="mx-auto max-w-xl px-4 pt-24 sm:px-6 sm:pt-32 lg:max-w-7xl lg:px-8"
    >
      <h2 id="collection-heading" className="text-2xl font-bold tracking-tight text-gray-900">
        {home_dictionary.services_header}
      </h2>
      <p className="mt-4 text-base text-gray-500">{home_dictionary.services_subHeader}</p>

      <div className="mt-10 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
        {/* <AnimateOnScroll> */}
        {collections.map((collection) => (
          <AnimateOnScroll key={collection.name}>
            <Link href={collection.href} className="group block">
              <div
                aria-hidden="true"
                //   className="overflow-hidden rounded-lg group-hover:opacity-75 "
                className="aspect-h-4 aspect-w-6 overflow-hidden rounded-lg lg:aspect-h-4 lg:aspect-w-6 group-hover:opacity-75"
              >
                <Image
                  src={collection.imageSrc}
                  alt={collection.imageAlt}
                  width={500}
                  height={500}
                  className="h-full w-full object-cover object-center transition duration-500 ease-in-out hover:scale-110"
                />
              </div>
              <h3 className="mt-4 text-base font-semibold text-gray-900">{collection.name}</h3>
              <p className="my-4 mt-2 text-sm text-gray-500">{collection.description}</p>
            </Link>
          </AnimateOnScroll>
        ))}
        {/* </AnimateOnScroll> */}
      </div>
    </section>
  );
}
