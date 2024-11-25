import { CameraIcon } from '@heroicons/react/20/solid';
import BreadCrumbs from '@/components/ui/BreadCrumbs';
import engineImage from '@/assets/images/tuning/engine.webp';
import suspensionImage from '@/assets/images/tuning/suspension.webp';
import electronicsImage from '@/assets/images/tuning/ecu.webp';

import Image from 'next/image';
import { Dictionary, getDictionary } from '@/lib/get-dictionary';
import { LanguageProps } from '@/lib/types';

export default async function Tuning({ params: { lang } }: LanguageProps) {
  const dictionary = await getDictionary(lang);
  const common_dictionary = dictionary.common;
  return (
    <>
      <div className="absolute  z-10 mt-6 w-full">
        <div className="relative mx-auto max-w-screen-2xl px-6">
          <BreadCrumbs
            navigation={[
              { name: common_dictionary.home!, href: '/' },
              { name: common_dictionary.tuning, href: '#' }
            ]}
          />
        </div>
      </div>
      <div className="z-0">
        <div id="tuning" />
        <Engine dictionary={dictionary} />
        <div id="suspension" />
        <Suspension dictionary={dictionary} />
        <div id="electronics" />
        <Electronics dictionary={dictionary} />
      </div>
    </>
  );
}

interface Props {
  dictionary: Dictionary;
}

const Electronics = ({ dictionary }: Props) => {
  const common_dictionary = dictionary.common;
  const tuning_dictionary = dictionary.tuning;
  return (
    <div className="overflow-hidden bg-white ">
      <div className="relative mx-auto max-w-7xl px-6 pb-32 lg:px-8">
        <div className="absolute bottom-0 left-3/4 top-0 hidden w-screen bg-gray-50 lg:block" />
        <div className="mx-auto max-w-prose text-base lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-8">
          <div>
            <h2 className="text-lg font-semibold text-red-600">{common_dictionary.tuning}</h2>
            <h3 className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              {tuning_dictionary.electronics}
            </h3>
          </div>
        </div>
        <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="relative lg:col-start-2 lg:row-start-1">
            <svg
              className="absolute right-0 top-0 -mr-20 -mt-20 hidden lg:block"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="de316486-4a29-4312-bdfc-fbce2132a2c1"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect width={404} height={384} fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)" />
            </svg>
            <div className="relative mx-auto max-w-prose text-base lg:max-w-none">
              <figure>
                <div className="aspect-h-7 aspect-w-12 lg:aspect-none">
                  <Image
                    alt=""
                    src={electronicsImage}
                    loading="lazy"
                    width={1000}
                    height={700}
                    //   className="my-4 shadow-lg rounded-md"
                    className="rounded-lg object-cover object-center shadow-lg"
                  />
                  {/* <img
                        className="rounded-lg object-cover object-center shadow-lg"
                        src="https://images.unsplash.com/photo-1546913199-55e06682967e?ixlib=rb-1.2.1&auto=format&fit=crop&crop=focalpoint&fp-x=.735&fp-y=.55&w=1184&h=1376&q=80"
                        alt="Whitney leaning against a railing on a downtown street"
                        width={1184}
                        height={1376}
                      /> */}
                </div>
                <figcaption className="mt-3 flex text-sm text-gray-500">
                  <CameraIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                  <span className="ml-2">Photo Electronics</span>
                </figcaption>
              </figure>
            </div>
          </div>
          <div className="mt-8 lg:mt-0">
            <div className="mx-auto max-w-prose text-base lg:max-w-none">
              <p className="text-lg text-gray-500">{tuning_dictionary.electronics_p1}</p>
            </div>
            <div className="prose-red prose mx-auto mt-5 text-gray-500 lg:col-start-1 lg:row-start-1 lg:max-w-none">
              <p className="text-lg text-gray-500">{tuning_dictionary.electronics_ul}</p>
              <ul role="list">
                {Array.from({ length: 5 }, (_, i) => (
                  // @ts-ignore
                  <li key={i}>{tuning_dictionary[`electronics_l${i + 1}`]}</li>
                ))}
              </ul>

              {/* <h3>How we helped</h3>
                <p>
                  Tincidunt integer commodo, cursus etiam aliquam neque, et. Consectetur pretium in volutpat, diam.
                  Montes, magna cursus nulla feugiat dignissim id lobortis amet. Laoreet sem est phasellus eu proin massa,
                  lectus. Diam rutrum posuere donec ultricies non morbi. Mi a platea auctor mi.
                </p>
                <p>
                  Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum urna sed consectetur neque tristique
                  pellentesque. Blandit amet, sed aenean erat arcu morbi.
                </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Engine = ({ dictionary }: Props) => {
  const common_dictionary = dictionary.common;
  const tuning_dictionary = dictionary.tuning;
  return (
    <div className="overflow-hidden bg-white ">
      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-24 lg:px-8">
        <div className="absolute bottom-0 left-3/4 top-0 hidden w-screen bg-gray-50 lg:block" />
        <div className="mx-auto max-w-prose text-base lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-8">
          <div>
            <h2 className="text-lg font-semibold text-red-600">{common_dictionary.tuning}</h2>
            <h3 className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              {tuning_dictionary.engine}
            </h3>
          </div>
        </div>
        <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="relative lg:col-start-2 lg:row-start-1">
            <svg
              className="absolute right-0 top-0 -mr-20 -mt-20 hidden lg:block"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="de316486-4a29-4312-bdfc-fbce2132a2c1"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect width={404} height={384} fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)" />
            </svg>
            <div className="relative mx-auto max-w-prose text-base lg:max-w-none">
              <figure>
                <div className="aspect-h-7 aspect-w-12 lg:aspect-none">
                  <Image
                    alt=""
                    src={engineImage}
                    loading="lazy"
                    width={1000}
                    height={700}
                    //   className="my-4 shadow-lg rounded-md"
                    className="rounded-lg object-cover object-center shadow-lg"
                  />
                  {/* <img
                      className="rounded-lg object-cover object-center shadow-lg"
                      src="https://images.unsplash.com/photo-1546913199-55e06682967e?ixlib=rb-1.2.1&auto=format&fit=crop&crop=focalpoint&fp-x=.735&fp-y=.55&w=1184&h=1376&q=80"
                      alt="Whitney leaning against a railing on a downtown street"
                      width={1184}
                      height={1376}
                    /> */}
                </div>
                <figcaption className="mt-3 flex text-sm text-gray-500">
                  <CameraIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                  <span className="ml-2">Photo Engine</span>
                </figcaption>
              </figure>
            </div>
          </div>
          <div className="mt-8 lg:mt-0">
            <div className="mx-auto max-w-prose text-base lg:max-w-none">
              <p className="text-lg text-gray-500">{tuning_dictionary.engine_p1}</p>
            </div>
            <div className="prose-red prose mx-auto mt-5 text-gray-500 lg:col-start-1 lg:row-start-1 lg:max-w-none">
              <p className="text-lg text-gray-500">{tuning_dictionary.engine_ul}</p>
              <ul role="list">
                {Array.from({ length: 5 }, (_, i) => (
                  // @ts-ignore
                  <li key={i}>{tuning_dictionary[`engine_l${i + 1}`]}</li>
                ))}
              </ul>

              {/* <h3>How we helped</h3>
                <p>
                  Tincidunt integer commodo, cursus etiam aliquam neque, et. Consectetur pretium in volutpat, diam.
                  Montes, magna cursus nulla feugiat dignissim id lobortis amet. Laoreet sem est phasellus eu proin massa,
                  lectus. Diam rutrum posuere donec ultricies non morbi. Mi a platea auctor mi.
                </p>
                <p>
                  Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum urna sed consectetur neque tristique
                  pellentesque. Blandit amet, sed aenean erat arcu morbi.
                </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Suspension = ({ dictionary }: Props) => {
  const common_dictionary = dictionary.common;
  const tuning_dictionary = dictionary.tuning;
  return (
    <div className="overflow-hidden bg-white ">
      <div className="relative mx-auto max-w-7xl  px-6 pb-16 lg:px-8">
        <div className="absolute bottom-0 left-3/4 top-0 hidden w-screen bg-gray-50 lg:block" />
        <div className="mx-auto max-w-prose text-base lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-8">
          <div>
            <h2 className="text-lg font-semibold text-red-600">{common_dictionary.tuning}</h2>
            <h3 className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              {tuning_dictionary.suspension}
            </h3>
          </div>
        </div>
        <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="relative lg:col-start-2 lg:row-start-1">
            <svg
              className="absolute right-0 top-0 -mr-20 -mt-20 hidden lg:block"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="de316486-4a29-4312-bdfc-fbce2132a2c1"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect width={404} height={384} fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)" />
            </svg>
            <div className="relative mx-auto max-w-prose text-base lg:max-w-none">
              <figure>
                <div className="aspect-h-7 aspect-w-12 lg:aspect-none">
                  <Image
                    alt=""
                    src={suspensionImage}
                    loading="lazy"
                    width={1000}
                    height={700}
                    //   className="my-4 shadow-lg rounded-md"
                    className="rounded-lg object-cover object-center shadow-lg"
                  />
                  {/* <img
                        className="rounded-lg object-cover object-center shadow-lg"
                        src="https://images.unsplash.com/photo-1546913199-55e06682967e?ixlib=rb-1.2.1&auto=format&fit=crop&crop=focalpoint&fp-x=.735&fp-y=.55&w=1184&h=1376&q=80"
                        alt="Whitney leaning against a railing on a downtown street"
                        width={1184}
                        height={1376}
                      /> */}
                </div>
                <figcaption className="mt-3 flex text-sm text-gray-500">
                  <CameraIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                  <span className="ml-2">Photo Suspension</span>
                </figcaption>
              </figure>
            </div>
          </div>
          <div className="mt-8 lg:mt-0">
            <div className="mx-auto max-w-prose text-base lg:max-w-none">
              <p className="text-lg text-gray-500">{tuning_dictionary.suspension_p1}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

