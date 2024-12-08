import { getDictionary } from '@/lib/get-dictionary';
import { LanguageProps } from '@/lib/types';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/home/hero-section';

const ProductsSection = dynamic(() => import('@/components/home/products-section'));
const HPSection = dynamic(() => import('@/components/home/hp-section'));

export default async function HomePage({ params: { lng } }: LanguageProps) {
  const dictionary = await getDictionary(lng);
  return (
    <>
      <HeroSection dictionary={dictionary} />
      <ProductsSection dictionary={dictionary} />
      <HPSection dictionary={dictionary} /> 
    </>
  );
}
