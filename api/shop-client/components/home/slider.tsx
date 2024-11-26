'use client';
import image1 from '@/assets/images/slider/shop-1.jpg';
import image2 from '@/assets/images/slider/shop-2.jpg';
import image3 from '@/assets/images/slider/shop-3.jpg';
import image4 from '@/assets/images/slider/shop-4.jpg';
// import image5 from '@/assets/images/home5.jpg';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function Slider() {
  SwiperCore.use([Autoplay]);
  return (
    <Swiper
      className='h-full w-full'
      spaceBetween={50}
      slidesPerView={1}
      keyboard={{
        enabled: true
      }}
      autoplay={{
        delay: 5000
      }}
      loop={true}
      navigation={true}
    >
      <SwiperSlide>
        <Image
          width={1920}
          height={1080}
          src={image1}
          alt="image1"
          className="-z-10 h-full w-full  object-cover object-center"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          width={1920}
          height={1080}
          src={image2}
          alt="image1"
          className="-z-10 h-full w-full  object-cover object-center"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          width={1920}
          height={1080}
          src={image3}
          alt="image1"
          className="-z-10 h-full w-full  object-cover object-center"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          width={1920}
          height={1080}
          src={image4}
          alt="image1"
          className="-z-10 h-full w-full  object-cover object-top"
        />
      </SwiperSlide>
      {/* <SwiperSlide>
        <Image
          width={1920}
          height={1080}
          src={image5}
          alt="image1"
          className="-z-10 h-full w-full  object-cover object-center"
        />
      </SwiperSlide> */}
    </Swiper>
  );
}
