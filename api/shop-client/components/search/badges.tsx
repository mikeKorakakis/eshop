import Badge from '@/components/ui/Badge';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Props = {
  facetMap: Map<string, string>;
  collectionMap: Map<string, string>;
  q: string | undefined;
  f: string[];
  c: string | undefined;
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedCollection: React.Dispatch<React.SetStateAction<string>>;
};

export default function Badges({ facetMap, collectionMap, q, f, c, setSelectedFilters, setSelectedCollection }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const handleDeleteQueryAndRedirect = (query: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete('take')
    params.delete('skip');
    params.delete(query);
    router.push(pathname + '?' + params.toString());
  }; 

  return (
    <span className="block space-x-1 space-y-1 ">
      <>
        {q && <Badge onClick={() => handleDeleteQueryAndRedirect('q')}>{q}</Badge>}
        {c && (
          <Badge color="indigo" onClick={() => setSelectedCollection("")}>
            {collectionMap.get(c)}
          </Badge>
        )}
        {f.map((facet, i) => {
          return (
            <Badge
              key={i}
              color="emerald"
              onClick={() => {
                setSelectedFilters((prev) => {
                    const index = prev.indexOf(facet);
                    if (index > -1) {
                        prev.splice(index, 1);
                    }
                    return [...prev];
                    });
              }}
            >
              {facetMap.get(facet)}
            </Badge>
          );
        })}
      </>
    </span>
  );
}
