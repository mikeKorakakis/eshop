'use client';
import React from 'react';
import { types } from 'util';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { Dictionary } from '@/lib/get-dictionary';
import { useRouter } from 'next/navigation';

// generate generic typescript props from transactions interface
type Props = {
  headers: string[];
  values: {
    id: string;
    orderPlacedAt: string;
    code: string;
    total: { price: number; currencyCode: string };
    totalWithTax: { price: number; currencyCode: string };
    state: string;
    products: { id: string; name: string; slug: string }[];
  }[];
  skip: number;
  isLoading?: boolean;
  dictionary: Dictionary;
};

export default function OrderTable({ headers, values, skip, isLoading, dictionary }: Props) {
  const profile_dictionary = dictionary.profile;
  const router = useRouter();
  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead className="bg-gray-50">
        <tr>
          {headers.map((header) => (
            <th
              key={header}
              scope="col"
              className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      {isLoading || values.length === 0 ? (
        <tbody className="divide-y divide-gray-200 bg-white">
          {Array.from({ length: 10 }).map((_, i) => (
            <tr key={i} className="hover:bg-gray-100">
              <td
                className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6"
                colSpan={6}
              >
                <div className="h-6 w-full animate-pulse rounded bg-gray-300"></div>
              </td>
            </tr>
          ))}
        </tbody>
      ) : (
        <tbody className="divide-y divide-gray-200 bg-white">
          {values.map((value, i) => (
            <tr
              key={i}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => router.push(`/orders/${value?.code}`)}
            >
              <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                {skip + i + 1}
              </td>
              <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                {value.products.map((product, i) => (
                  <div key={i} className="group relative z-50 flex cursor-pointer">
                    <span className="absolute  left-3/4 m-4 mx-auto -mt-14 -translate-x-1/2 translate-y-full overflow-visible rounded-md bg-gray-800 p-1 px-1 text-sm text-gray-100 opacity-0 transition-opacity delay-500 group-hover:opacity-100">
                      {product?.name}
                    </span>
                    <Link className="hover:underline" href={`/product/${product?.slug}`} key={i}>
                      {product?.name && product?.name?.substring(0, 30)}...
                    </Link>{' '}
                  </div>
                ))}
              </td>
              <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                {value.orderPlacedAt &&
                  types.isDate(new Date(value.orderPlacedAt)) &&
                  new Date(value.orderPlacedAt).toLocaleDateString()}
              </td>
              <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                <Price value={value?.total.price} currencyCode={value?.total?.currencyCode} />
              </td>
              <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                <Price
                  value={value?.totalWithTax?.price}
                  currencyCode={value?.total?.currencyCode}
                />
              </td>
              <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                {
                  profile_dictionary[
                    value.state as
                      | 'Cancelled'
                      | 'PaymentAuthorized'
                      | 'PaymentSettled'
                      | 'Delivered'
                      | 'AddingItems'
                  ]
                }
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
}

const Price = ({ value, currencyCode }: { value: number; currencyCode: string }) => {
  const price = formatPrice(value / 100, currencyCode);
  return <>{price}</>;
};
