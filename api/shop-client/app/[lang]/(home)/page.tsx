// import { Carousel } from 'components/carousel';
// import { ThreeItemGrid } from 'components/grid/three-items';
// import Footer from 'components/layout/footer';
// import { Suspense } from 'react';
// import { getCollections } from '@/lib/vendure/shop/collections/collections';
// import { getDictionary } from '@/lib/get-dictionary';
import { getDictionary } from '@/lib/get-dictionary';
import { LanguageProps } from '@/lib/types';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/home/hero-section';

const BenelliSection = dynamic(() => import('@/components/home/benelli-section'));
const ServicesSection = dynamic(() => import('@/components/home/services-section'));
const BrandsSection = dynamic(() => import('@/components/home/brands-section'));
const TuningSection = dynamic(() => import('@/components/home/tuning-section'));

// export const runtime = 'edge';

export default async function HomePage({ params: { lang } }: LanguageProps) {
  const dictionary = await getDictionary(lang);
  return (
    <>
      <HeroSection dictionary={dictionary} />
      <ServicesSection dictionary={dictionary} />
      <BrandsSection dictionary={dictionary} />
      <TuningSection dictionary={dictionary} />
      <BenelliSection dictionary={dictionary} />
    </>
  );
}
