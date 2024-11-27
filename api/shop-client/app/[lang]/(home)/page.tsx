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

const ProductsSection = dynamic(() => import('@/components/home/products-section'));
const BenelliSection = dynamic(() => import('@/components/home/benelli-section'));

export default async function HomePage({ params: { lang } }: LanguageProps) {
  const dictionary = await getDictionary(lang);
  return (
    <>
      <HeroSection dictionary={dictionary} />
      <ProductsSection dictionary={dictionary} />
      <BenelliSection dictionary={dictionary} /> 
    </>
  );
}
