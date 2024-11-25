import React from 'react';
import { Dictionary } from '@/lib/get-dictionary';
import Slider from './slider';

interface Props {
  dictionary: Dictionary;
}

export default async function HeroSection({ dictionary }: Props) {
  const home_dictionary = dictionary.home;
  
  return (
    <div className="relative ">
      {/* Decorative image and overlay */}
      <div aria-hidden="true" className="-z-10 absolute inset-0 overflow-hidden">
       <Slider/>
        {/* <Image
          src={zenoneImage}
          alt="image1"
          className="h-full w-full object-cover  object-center "
        /> */}
        {/* <img
          src="/moto-shop.jpg"
          alt=""
          className="h-full w-full object-cover object-center"
        /> */}
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-gray-900 opacity-30 " />

      {/* Navigation */}

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0 ">
        <div className="h-fit rounded-lg bg-gray-700 bg-opacity-75 p-10">
          <h1 className="z-10 text-4xl font-bold tracking-tight text-white lg:text-6xl">
            {home_dictionary.greeting}
          </h1>

          <p className="z-10 mt-4 text-xl text-white">{home_dictionary.p1}</p>
          <p className="z-10 mt-4 text-xl text-white">{home_dictionary.p3}</p>
          <a
            href="https://zenone.car.gr/parts"
            target="_blank"
            rel="noreferrer"
            className="z-10 mt-8 inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
          >
            {home_dictionary.cta}
          </a>
        </div>
      </div>
    </div>

    // <div className="relative overflow-hidden h-full">
    //   <div aria-hidden="true" className="absolute inset-0 overflow-hidden ">
    //     {/* <img src="/moto-shop.jpg" alt="" className="w-full   object-fill" /> */}

    //     {/* <Image
    //       src={zenoneImage}
    //       alt="image1"
    //       className="h-full w-full object-cover "
    //     /> */}
    //     <Swiper
    //       className="z-0"
    //       spaceBetween={50}
    //       slidesPerView={1}
    //       keyboard={{
    //         enabled: true,
    //       }}
    //       autoplay={{
    //         delay: 5000,
    //       }}
    //       loop={true}
    //       navigation={true}
    //     >
    //       <SwiperSlide>
    //         <Image
    //           src={zenoneImage}
    //           alt="image1"
    //           className="h-full w-full object-cover "
    //         />
    //       </SwiperSlide>
    //       <SwiperSlide>
    //         <Image
    //           src={shopImage}
    //           alt="image1"
    //           className="h-full w-full object-cover "
    //         />
    //       </SwiperSlide>
    //     </Swiper>
    //   </div>
    //   <div
    //     aria-hidden="true"
    //     className="absolute inset-0 bg-gray-900 opacity-50"
    //   />
    //   <div className="relative mx-auto flex max-w-3xl flex-col items-center py-32 px-6 text-center sm:py-64 lg:px-0">
    //     <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">
    //       New arrivals are here
    //     </h1>

    //     <p className="mt-4 text-xl text-white">
    //       The new arrivals have, well, newly arrived. Check out the latest
    //       options from our summer small-batch release while they're still in
    //       stock.
    //     </p>
    //     <a
    //       href="#"
    //       className="mt-8 inline-block rounded-md border border-transparent bg-white py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100"
    //     >
    //       Shop New Arrivals
    //     </a>
    //   </div>
    // </div>
  );
}
