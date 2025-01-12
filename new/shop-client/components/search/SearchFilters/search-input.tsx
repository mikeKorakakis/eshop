import { FC, memo, useCallback, useEffect } from 'react';
import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import toast from 'react-hot-toast';
import { Dictionary } from '@/lib/get-dictionary';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Props = {
  q: string | undefined;
  dictionary: Dictionary;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
};

const Searchbar: FC<Props> = ({ q, dictionary }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const [activeQuery, setActiveQuery] = useState<string | undefined>(q);

  useEffect(() => {
    setActiveQuery(q);
  }, [q]);
  const [query, setQuery] = useState('');
  const common_dictionary = dictionary.common;

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.key === 'Enter' && query !== '') {
      if (query.length < 3) {
        toast.error(common_dictionary.longer_3);
      } else {
        setActiveQuery(query);
      }
    }
  };

  const handleClick = () => {
    if (query.length < 3) {
      toast.error(common_dictionary.longer_3);
    } else {
      setActiveQuery(query);
    }
  };

  const createQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    // params.delete('take')
    // params.delete('skip');
    activeQuery ? params.set('q', activeQuery) : params.delete('q');

    return params.toString();
  }, [searchParams, activeQuery]);

  useEffect(() => {
    router.push(pathname + '?' + createQueryString());
  }, [activeQuery, createQueryString, pathname, router]);

  return (
    <div className="relative mb-2 rounded-md bg-white">
      <MagnifyingGlassIcon
        className=" absolute left-2 top-3.5 h-5 w-5 cursor-pointer text-gray-400"
        aria-hidden="true"
        onClick={handleClick}
      />
      <input
        //   className="border block border-zinc-200 w-full sm:text-sm font-normal shadow-sm rounded-md focus:border-red-500 focus:ring-red-500 focus:outline-none focus:ring-1"
        className="h-12 w-full border-0 bg-transparent pl-12 text-gray-800 placeholder-gray-400 shadow focus:ring-2 focus-visible:outline-0 focus:ring-red-500  sm:text-sm "
        placeholder={`${common_dictionary.search}...`}
        onChange={(event) => setQuery(event.target.value)}
        onKeyUp={handleKeyUp}
      />
    </div>
  );
};

export default memo(Searchbar);
