'use client';
import PriceSlider from '@/components/ui/PriceSlider';
import { Dictionary } from '@/lib/get-dictionary';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

type Props = {
  dictionary: Dictionary;
  searchResMaxPrice: number;
  minPriceTax: number | undefined;
  maxPriceTax: number | undefined;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
};

export default function SearchPrice({
  dictionary,
  searchResMaxPrice,
  minPriceTax,
  maxPriceTax
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  
  const [minPT, setMinPT] = useState(minPriceTax ? Number(minPriceTax) : 0);
  const [maxPT, setMaxPT] = useState(maxPriceTax ? Number(maxPriceTax) : searchResMaxPrice);
  const [prices, setPrices] = useState<number[]>([minPT, maxPT]);

  const createQueryString = useCallback(
    () => {
      const params = new URLSearchParams(searchParams);
    //   params.delete('take')
    //   params.delete('skip');
      params.set('minPriceTax', minPT.toString());
      params.set('maxPriceTax', maxPT.toString());

      return params.toString();
    },
    [searchParams, minPT, maxPT]
  );

  useEffect(() => {
    router.push(pathname + '?' + createQueryString());
  }, [prices, createQueryString, pathname, router]);

  return (
    <PriceSlider
      className=" h-8"
      maxPrice={searchResMaxPrice}
      setMinPT={setMinPT}
      setMaxPT={setMaxPT}
      // defaultValue={[25, 75]}
      value={prices}
      setPrices={setPrices}
      dictionary={dictionary}
    />
  );
}
