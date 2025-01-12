import { ChangeEvent, Fragment, useCallback, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { Facet } from '@/lib/vendure/generated/graphql-shop';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Props = {
  facets: Facet[];
  f: string[];
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
};

export default function SearchFacets({
  facets,
  f,
  selectedFilters,
  setSelectedFilters,
  setSkip
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  useEffect(() => {
    setSelectedFilters(f);
  }, [f, setSelectedFilters]);

  const modelFacets = facets.filter((fac) => fac.code === 'model');

  const modelOptions = new Map<
    string,
    { id: string; name: string; code: string; checked: boolean }[]
  >();

  modelFacets[0]?.values.forEach((facVal) => {
    const manufacturer = facVal.code.split('-')[0] ?? 'no_manufacturer';
    const oldValue = modelOptions.get(manufacturer) ?? [];
    const newValue = [...oldValue, { ...facVal, checked: selectedFilters.includes(facVal.id) }];
    modelOptions.set(manufacturer, newValue);
  });

  let filters = facets.map((fac) => ({
    id: fac.id,
    name: fac.name,
    code: fac.code,
    options: fac.values.map((facVal) => ({
      value: facVal.id,
      code: facVal.code,
      label: facVal.name,
      checked: selectedFilters.includes(facVal.id)
    }))
  }));

  // eslint-disable-next-line no-unused-vars
  const handleChangeFilters = (e: ChangeEvent<HTMLInputElement>, option: string, i: number) => {
    e.target.checked
      ? setSelectedFilters((old) => [...old, option])
      : setSelectedFilters((old) => old.filter((o) => o !== option));
  };

  const manufacturerFilter = filters.filter((filter) => filter.code === 'manufacturer')[0];
  const manufacturerCodes = manufacturerFilter?.options?.map((option) => option.code);
  const openManufacturer = manufacturerCodes?.some(
    (manufacturer) => modelOptions?.get(manufacturer || 'honda')?.some((x) => x.checked)
  );

  filters = filters?.filter((filter) => filter.code !== 'model');

  const createQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    // params.delete('take')
    // params.delete('skip');
    params.delete('f');
    if (selectedFilters && selectedFilters.length > 0) {
      selectedFilters.forEach((value) => {
        params.append('f', value);
      });
    }

    return params.toString();
  }, [searchParams, selectedFilters]);

  useEffect(() => {
    const queryString = createQueryString();
    if (new URLSearchParams(searchParams).toString() !== queryString) {
      setSkip(0);
      router.push(pathname + '?' + queryString);
    }
  }, [searchParams, createQueryString, pathname, router, setSkip]);

  return (
    <div>
      {filters.map((section, i) => {
        const dOpen = section.options.some((x) => x.checked);
        const key = selectedFilters[0];
        return (
          <Disclosure
            className={clsx(
              'overflow-hidden border-2 border-gray-400 bg-white [&_summary::-webkit-details-marker]:hidden',
              i !== 0 && 'border-t-0'
            )}
            as="div"
            key={`${key} ${i}`}
            defaultOpen={dOpen || (section.code === 'manufacturer' && openManufacturer)}
            //   className="border-b border-gray-200 py-6"
          >
            {({ open }) => (
              <>
                <div className="space-y-2">
                  <Disclosure.Button className=" flex w-full cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                    <span className="text-sm font-bold text-gray-900">{section.name}</span>
                    <span className=" flex items-center">
                      <ChevronDownIcon
                        className={clsx('h-5 w-5 transition-all	', open && 'rotate-180')}
                        aria-hidden="true"
                      />
                    </span>
                  </Disclosure.Button>
                </div>
                <Disclosure.Panel className=" border-t border-gray-200 bg-white">
                  <div
                    // className=
                    className={clsx('space-y-1  border-t border-gray-200 p-4')}
                  >
                    {section.options.map((option, optionIdx) => (
                      <div key={optionIdx} className="flex items-center gap-2">
                        {section.code !== 'manufacturer' && (
                          <>
                            <input
                              id={`filter-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              defaultValue={option.value}
                              type="checkbox"
                              defaultChecked={option.checked}
                              onChange={(e) => handleChangeFilters(e, option.value, i)}
                              className="h-5 w-5 rounded border-gray-300 text-red-600 focus:ring-red-500"
                            />
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="text-sm font-medium text-gray-700"
                            >
                              {option.label}
                            </label>
                          </>
                        )}
                        {section.code === 'manufacturer' &&
                          modelOptions?.get(option?.code || 'honda') && (
                            <Disclosure
                              as="div"
                              key={`${option.code} ${option.value}`}
                              defaultOpen={
                                modelOptions
                                  ?.get(option?.code || 'honda')
                                  ?.some((x) => x.checked) ||
                                selectedFilters.some((val) => val === option.value)
                              }
                              className="w-full"
                            >
                              {({ open }) => (
                                <>
                                  <div className="w-full ">
                                    <Disclosure.Button
                                      className="flex w-full items-center justify-between  gap-2 text-gray-900 transition"

                                      //   className="flex w-full items-center   py-3 text-sm text-gray-400 hover:text-gray-500"
                                    >
                                      {/* <span className="font-medium text-gray-900">
                                      {option.label}
                                    </span> */}
                                      <input
                                        id={`filter-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        defaultChecked={option.checked}
                                        onChange={(e) => handleChangeFilters(e, option.value, i)}
                                        className="h-5 w-5 rounded border-gray-300  text-red-600 focus:ring-red-500 "
                                      />
                                      <label
                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                        className="ml-3 text-sm text-gray-600"
                                      >
                                        {option.label}
                                      </label>
                                      <div className="grow "></div>
                                      <span className="ml-6 flex items-center">
                                        <ChevronDownIcon
                                          className={clsx(
                                            'h-5 w-5 transition-all	',
                                            open && 'rotate-180'
                                          )}
                                          aria-hidden="true"
                                        />
                                      </span>
                                    </Disclosure.Button>
                                  </div>
                                  <Disclosure.Panel className="">
                                    <div className="space-y-1 pt-2">
                                      {modelOptions.get(option.code || 'honda') &&
                                        modelOptions
                                          ?.get(option?.code || 'honda')
                                          ?.map((opt, optIdx) => (
                                            <div key={optIdx} className="flex items-center gap-1">
                                              <input
                                                id={`filter-${opt.id}-${optIdx}`}
                                                name={`${opt.id}[]`}
                                                defaultValue={opt.id}
                                                type="checkbox"
                                                defaultChecked={opt.checked}
                                                onChange={(e) => handleChangeFilters(e, opt.id, i)}
                                                className="ml-4 h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                              />
                                              <label
                                                htmlFor={`filter-${opt.id}-${optIdx}`}
                                                className="ml-3 text-xs font-medium text-gray-700"
                                              >
                                                {opt.name}
                                              </label>
                                            </div>
                                          ))}
                                    </div>
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                          )}
                      </div>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        );
      })}
    </div>
  );
}
