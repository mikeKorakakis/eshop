import { Dictionary } from '@/lib/get-dictionary';
import { Order } from '@/lib/vendure/generated/graphql-shop';
import { BanknotesIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import placeholderImg from '@/assets/images/product-img-placeholder.svg';
import Image from 'next/image';
import Link from 'next/link';
import { getActiveCustomerQuery } from '@/lib/vendure/shop/customer/customer';
import { formatPrice } from '@/lib/utils';
import { LINKS } from '@/lib/constants';
import { redirect } from 'next/navigation';

type Props = {
  dictionary: Dictionary;
  order: Order;
  lang: string;
  redirect_status?: string
};

const dateOptions = {
  weekday: 'long' as 'long' | 'short' | 'narrow' | undefined,
  year: 'numeric' as 'numeric' | '2-digit' | undefined,
  month: 'long' as 'long' | 'short' | 'narrow' | undefined,
  day: 'numeric' as 'numeric' | '2-digit' | undefined
};

const getStep = (status: string) => {
  switch (status) {
    case 'Created':
      return 0;
    case 'Payment settled':
      return 1;
    case 'Shipped':
      return 2;
    case 'Delivered':
      return 4;
    default:
      return 0;
  }
};

export default async function OrderView({ dictionary, order, lang, redirect_status }: Props) {
  const common_dictionary = dictionary.common;
  const order_dictionary = dictionary.order;
  const customer = await getActiveCustomerQuery();
  const messageArray = [
    order_dictionary.created_order,
    order_dictionary.payed_order,
    order_dictionary.shipped_order,
    order_dictionary.delivered_order,
    order_dictionary.delivered_order
  ];
  if(!order) return redirect(LINKS.link_home)
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          {redirect_status === 'succeeded' && <div className='py-8'>
            {order?.state === "Payment settled" && <h1 className="text-sm font-medium text-red-600">{order_dictionary.payment_successful}</h1>}
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {order_dictionary.thanks_order}
            </p>
            <p className="mt-2 text-base text-gray-500">
            {order_dictionary.appreciate_order}
            </p>
          </div>}
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {order_dictionary.order_details}
          </h1>

          <div className="mt-2 border-b border-gray-200 pb-5 text-sm sm:flex sm:justify-between">
            <dl className="flex">
              <dt className="text-gray-500">{order_dictionary.order_number}&nbsp;</dt>
              <dd className="font-medium text-gray-900">{order?.code}</dd>
              <dt>
                <span className="sr-only">{common_dictionary.date}</span>
                <span className="mx-2 text-gray-400" aria-hidden="true">
                  &middot;
                </span>
              </dt>
              <dd className="font-medium text-gray-900">
                <time dateTime="2021-03-22">
                  {new Date(order?.createdAt).toLocaleDateString(lang, dateOptions)}
                </time>
              </dd>
            </dl>
            <div className="mt-4 sm:mt-0">
              {/* <a href="#" className="font-medium text-red-600 hover:text-red-500">
                View invoice
                <span aria-hidden="true"> &rarr;</span>
              </a> */}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="sr-only">{order_dictionary.products_purchased}</h2>

            <div className="space-y-24">
              {order?.lines.map((orderLine) => (
                <div
                  key={orderLine.id}
                  className="grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-8"
                >
                  <div className="sm:col-span-4 md:col-span-5 md:row-span-2 md:row-end-2">
                    <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-50">
                      <Image
                        src={orderLine?.featuredAsset?.preview || placeholderImg}
                        alt={orderLine?.featuredAsset?.name || 'product image'}
                        className="object-cover object-center"
                        width={500}
                        height={500}
                      />
                    </div>
                  </div>
                  <div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      <Link href={orderLine?.productVariant?.product?.slug}>
                        {orderLine?.productVariant?.name}
                      </Link>
                    </h3>
                    <p className="mt-1 font-medium text-gray-900">
                      {formatPrice(orderLine?.productVariant?.priceWithTax, order?.currencyCode)}{' '}
                    </p>
                    <p className="mt-3 line-clamp-3 text-gray-500">
                      {orderLine?.productVariant?.product?.description}
                    </p>
                  </div>
                  <div className="sm:col-span-12 md:col-span-7">
                    <dl className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
                      <div>
                        <dt className="font-medium text-gray-900">
                          {common_dictionary.shipping_address}
                        </dt>
                        <dd className="mt-3 text-gray-500">
                          <span className="block">{order?.shippingAddress?.fullName}</span>
                          <span className="block">
                            {order?.shippingAddress?.streetLine1},{' '}
                            {order?.shippingAddress?.postalCode}
                          </span>
                          <span className="block">
                            {order?.shippingAddress?.city}, {order?.shippingAddress?.countryCode}
                          </span>
                        </dd>
                      </div>
                      {order?.customer && (
                        <div>
                          <dt className="font-medium text-gray-900">Shipping updates</dt>
                          <dd className="mt-3 space-y-3 text-gray-500">
                            <p>{order?.customer?.emailAddress}</p>
                            <p>{order?.customer?.phoneNumber}</p>
                            {customer && (
                              <button
                                type="button"
                                className="font-medium text-red-600 hover:text-red-500"
                              >
                                {common_dictionary.edit}
                              </button>
                            )}
                          </dd>
                        </div>
                      )}
                    </dl>
                    {order?.fulfillments && order?.fulfillments[0] && (
                      <>
                        <p className="mt-6 font-medium text-gray-900 md:mt-10">
                          {messageArray[getStep(order?.fulfillments[0]?.state)]}{' '}
                          {common_dictionary.on}{' '}
                          <time dateTime={order?.fulfillments[0]?.updatedAt}>
                            {new Date(order?.fulfillments[0]?.updatedAt).toLocaleDateString(
                              lang,
                              dateOptions
                            )}
                          </time>
                        </p>
                        <div className="mt-6">
                          <div className="overflow-hidden rounded-full bg-gray-200">
                            <div
                              className="h-2 rounded-full bg-red-600"
                              style={{
                                width: `calc((${getStep(
                                  order?.fulfillments[0].state
                                )} * 2 + 1) / 8 * 100%)`
                              }}
                            />
                          </div>
                          <div className="mt-6 hidden grid-cols-4 font-medium text-gray-600 sm:grid">
                            <div className="text-red-600">{order_dictionary.order_placed}</div>
                            <div
                              className={clsx(
                                getStep(order?.fulfillments[0].state) > 0 ? 'text-red-600' : '',
                                'text-center'
                              )}
                            >
                              {order_dictionary.processing}
                            </div>
                            <div
                              className={clsx(
                                getStep(order?.fulfillments[0].state) > 1 ? 'text-red-600' : '',
                                'text-center'
                              )}
                            >
                              {order_dictionary.shipped}
                            </div>
                            <div
                              className={clsx(
                                getStep(order?.fulfillments[0].state) > 2 ? 'text-red-600' : '',
                                'text-right'
                              )}
                            >
                              {order_dictionary.delivered}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Billing */}
          <div className="mt-24">
            <h2 className="sr-only">{order_dictionary.billing_summary}</h2>

            <div className="rounded-lg bg-gray-50 px-6 py-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-0 lg:py-8">
              <dl className="grid grid-cols-1 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-5 lg:pl-8">
                <div>
                  <dt className="font-medium text-gray-900">{common_dictionary.billing_address}</dt>
                  <dd className="mt-3 text-gray-500">
                    <span className="block">{order?.billingAddress?.fullName}</span>
                    <span className="block">
                      {order?.billingAddress?.streetLine1}, {order?.billingAddress?.postalCode}
                    </span>
                    <span className="block">
                      {order?.billingAddress?.city}, {order?.billingAddress?.countryCode}
                    </span>
                  </dd>
                </div>
                {order?.payments && (
                  <div>
                    <dt className="font-medium text-gray-900">{order_dictionary.payment_info}</dt>
                    <dd className="mt-3 flex">
                      <div>
                        {order?.payments[0]?.method === 'stripe' ||
                        order?.payments[0]?.method === 'braintree' ? (
                          <CreditCardIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                        ) : (
                          <BanknotesIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                        )}
                        <p className="sr-only">{order?.payments[0]?.method}</p>
                      </div>
                      <div className="ml-4">
                        <p className="text-gray-900">{order_dictionary.transaction_id}</p>
                        <p className="text-gray-600">{order?.payments[0]?.transactionId}</p>
                      </div>
                    </dd>
                  </div>
                )}
              </dl>

              <dl className="mt-8 divide-y divide-gray-200 text-sm lg:col-span-7 lg:mt-0 lg:pr-8">
                <div className="flex items-center justify-between pb-4">
                  <dt className="text-gray-600">{common_dictionary.subtotal}</dt>
                  <dd className="font-medium text-gray-900">
                    {formatPrice(order?.subTotal, order?.currencyCode)}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-4">
                  <dt className="text-gray-600">{common_dictionary.shipping}</dt>
                  <dd className="font-medium text-gray-900">
                    {formatPrice(order?.shipping, order?.currencyCode)}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-4">
                  <dt className="text-gray-600">{common_dictionary.taxes}</dt>
                  <dd className="font-medium text-gray-900">
                    {formatPrice(order?.taxSummary[0]?.taxTotal, order?.currencyCode)}
                  </dd>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <dt className="font-medium text-gray-900">{common_dictionary.total}</dt>
                  <dd className="font-medium text-red-600">
                    {formatPrice(order?.totalWithTax, order?.currencyCode)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
