'use client';
import { FC, useEffect, useState } from 'react';
import { clsx } from 'clsx';

import OrderTable from './order-table';
import Pagination from './pagination';
import { Dictionary } from '@/lib/get-dictionary';
import { getActiveCustomerOrdersQuery } from '@/lib/vendure/shop/customer/customer';
import { Order } from '@/lib/vendure/generated/graphql-shop';
// import { Table } from '@components/common'

interface Props {
  dictionary: Dictionary;
}

const OrdersView: FC<Props> = ({ dictionary }) => {
  const profile_dictionary = dictionary.profile;

  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getOrders = async ({ take, skip }: { take: number; skip: number }) => {
      setIsLoading(true);
      const res = await getActiveCustomerOrdersQuery(take, skip);
      const orders = res?.orders?.items;
      setOrders(orders);
      setTotalItems(res?.orders?.totalItems ?? 0);
      setIsLoading(false);
    };
    getOrders({ take, skip });
    // setOrders(res.);
  }, [take, skip]);
  //   const orders = data?.activeCustomer?.orders?.items

  const headers = [
    '#',
    profile_dictionary.items,
    profile_dictionary.date,
    profile_dictionary.total,
    profile_dictionary.total_with_tax,
    profile_dictionary.status
  ];
  const orderItems =
    orders &&
    orders
      //   ?.filter((order) => order?.state !== 'AddingItems')
      ?.map((order) => {
        return {
          id: order?.id ?? '',
          products:
            order?.lines.map((line) => {
              return {
                id: line?.productVariant?.id,
                name: line?.productVariant?.name,
                slug: line?.productVariant?.product?.slug
              };
            }) || [],
          code: order?.code ?? '',
          orderPlacedAt: (order?.orderPlacedAt as string) ?? '',
          total: { price: order?.total, currencyCode: order?.currencyCode },
          totalWithTax: {
            price: order?.totalWithTax,
            currencyCode: order?.currencyCode
          },
          state: order?.state ?? ''
        };
      });
  //   if (isLoading) return <LoadingDots />

  return (
    <form className="divide-y divide-gray-200 lg:col-span-9" method="POST">
      <div className="px-4 py-6 sm:p-6 lg:pb-8">
        <div>
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            {profile_dictionary.orders}
          </h2>
          <p className="mt-1 text-sm text-gray-500">{profile_dictionary.orders_description}</p>
        </div>

        {totalItems === 0 ? (
          <div className="py-6  lg:pb-96">{profile_dictionary.no_orders}</div>
        ) : (
          <div className="mt-6 ">
            <div
              className={clsx('h-full')}
              // onSubmit={handleSubmit}
            >
              <div className="mt-8">
                <div className="flex-1">
                  <div>
                    <hr className="my-6 border-accent-2" />
                    <div className="scrollbar-hide w-full overflow-x-scroll">
                      {/* {JSON.stringify(data, null, 2)} */}
                      {
                        <>
                          <OrderTable
                            dictionary={dictionary}
                            isLoading={isLoading}
                            headers={headers}
                            values={orderItems ?? []}
                            skip={skip}
                          />
                          {totalItems && (
                            <Pagination
                              dictionary={dictionary}
                              skip={skip}
                              setSkip={setSkip}
                              take={take}
                              setTake={setTake}
                              totalItems={totalItems}
                            />
                          )}
                        </>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default OrdersView;
