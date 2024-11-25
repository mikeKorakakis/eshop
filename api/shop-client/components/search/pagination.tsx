import Pagination from '@/components/ui/Pagination';
import { Dictionary } from '@/lib/get-dictionary';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';

type Props = {
  totalItems: number;
  dictionary: Dictionary;
  take: number;
  setTake: Dispatch<SetStateAction<number>>;
  skip: number;
  setSkip: Dispatch<SetStateAction<number>>;
  showBorder?: boolean;
};

export default function SearchPagination({
  totalItems,
  take,
  setTake,
  skip,
  setSkip,
  dictionary,
  showBorder = false
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const createQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.set('take', take.toString());
    params.set('skip', skip.toString());
    return params.toString();
  }, [searchParams, take, skip]);

  useEffect(() => {
    router.push(pathname + '?' + createQueryString());
  }, [take, skip, createQueryString, pathname, router]);

  return (
    <Pagination
      take={take}
      setTake={setTake}
      skip={skip}
      setSkip={setSkip}
      totalItems={totalItems}
      showBorder={showBorder}
      dictionary={dictionary}
    />
  );
}
