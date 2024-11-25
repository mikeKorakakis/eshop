import { Dictionary } from '@/lib/get-dictionary';
import { Collection } from '@/lib/vendure/generated/graphql-shop';
import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

type Props = {
  dictionary: Dictionary;
  collection: string | undefined;
  categories: Collection[];
  selectedCollection: string;
  setSelectedCollection: React.Dispatch<React.SetStateAction<string>>;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
};

export default function SearchCollection({
  dictionary,
  collection,
  categories,
  selectedCollection,
  setSelectedCollection
}: Props) {
  const common_dictionary = dictionary.common;
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const router = useRouter();

  useEffect(() => {
    setSelectedCollection(collection ?? '');
  }, [collection, setSelectedCollection]);

  const collections = categories.map((cat) => ({
    name: cat.name,
    id: cat.id,
    selected: selectedCollection === cat.id
  }));

  collections.unshift({
    name: common_dictionary.all,
    id: '',
    selected: selectedCollection === ''
  });

  const handleChangeCollection = (option: string) => {
    setSelectedCollection(option);
  };

  const createQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    // params.delete('take')
    // params.delete('skip');
    selectedCollection ? params.set('c', selectedCollection) : params.delete('c');

    return params.toString();
  }, [searchParams, selectedCollection]);

  useEffect(() => {
    router.push(pathname + '?' + createQueryString());
  }, [selectedCollection, createQueryString, pathname, router]);

  return collections.map((category, i) => (
    <li
      onClick={() => handleChangeCollection(category.id)}
      key={i}
      className={clsx(
        'font-bold py-2 pl-2 lg:rounded-md',
        category.selected
          ? 'bg-red-600  pl-4 text-white  hover:bg-red-700'
          : 'hover:bg-gray-100 '
      )}
    >
      <div
        className={clsx('md:cursor-pointer')}
        // href={category.href}
      >
        {category.name}
      </div>
    </li>
  ));
}
