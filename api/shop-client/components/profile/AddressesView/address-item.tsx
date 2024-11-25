'use client'
import { Address } from '@/lib/vendure/generated/graphql-shop';
import {
  GlobeAltIcon,
  PhoneIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import { MoreButton } from './more-button';
import { Dictionary } from '@/lib/get-dictionary';
import { useUI } from '@/components/ui/context';

export type Props = {
  address: Address;
  dictionary: Dictionary;
};

export default function AddressItem({ address, dictionary }: Props) {
  const { openModal, setModalView, setPayload } = useUI();
  const common_dictionary = dictionary.common;
  const handleEdit = () => {
    setPayload(address);
    setModalView('CREATE_UPDATE_ADDRESS_VIEW');
    openModal();
  };

  return (
    <li
      key={address.id}
      className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white shadow"
    >
      <div className="min-h-[7rem] px-8 pb-2">
        <h3 className="text-md mt-6 font-bold text-gray-900">
          {address?.streetLine1}, {address?.country?.code}
        </h3>
        {address?.defaultShippingAddress && (
          <>
            <dt className="sr-only">{common_dictionary.shipping_address}</dt>
            <dd className="">
              <span className="inline-flex items-center rounded-full bg-red-50 px-2  text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                {common_dictionary.shipping_address}
              </span>
            </dd>
          </>
        )}
        {address?.defaultBillingAddress && (
          <>
            <dt className="sr-only">{common_dictionary.billing_address}</dt>
            <dd className="">
              <span className="inline-flex items-center rounded-full bg-red-50 px-2  text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                {common_dictionary.billing_address}
              </span>
            </dd>
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col px-8 py-4">
        {address?.fullName && (
          <dl className="mt-1 flex flex-grow flex-col justify-between">
            <dt className="sr-only">{common_dictionary.full_name}</dt>
            <dd className="text-sm text-gray-500">{address?.fullName}</dd>
          </dl>
        )}
        {address?.city && (
          <dl className="mt-1 flex flex-grow flex-col justify-between">
            <dt className="sr-only">{common_dictionary.city}</dt>
            <dd className="text-sm text-gray-500">{address?.city}</dd>
          </dl>
        )}
        {address?.province && (
          <dl className="mt-1 flex flex-grow flex-col justify-between">
            <dt className="sr-only">{common_dictionary.province}</dt>
            <dd className="text-sm text-gray-500">{address?.province}</dd>
          </dl>
        )}
        {address?.postalCode && (
          <dl className="mt-1 flex flex-grow flex-col justify-between">
            <dt className="sr-only">{common_dictionary.postal_code}</dt>
            <dd className="text-sm text-gray-500">{address?.postalCode}</dd>
          </dl>
        )}
        {address?.country && (
          <dl className="mt-1 flex flex-grow flex-col justify-between">
            <div className="flex items-center">
              <GlobeAltIcon className="mr-1 h-4 w-4 text-gray-400" aria-hidden="true" />
              <dt className="sr-only">{common_dictionary.country}</dt>
              <dd className="text-sm text-gray-500">{address?.country.name}</dd>
            </div>
          </dl>
        )}
        {address?.phoneNumber && (
          <dl className="mt-1 flex flex-grow flex-col justify-between">
            <div className="flex items-center">
              <PhoneIcon className="mr-1 h-4 w-4 text-gray-400" aria-hidden="true" />
              <dt className="sr-only">{common_dictionary.phone}</dt>
              <dd className="text-sm text-gray-500">{address?.phoneNumber}</dd>
            </div>
          </dl>
        )}
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <button
              onClick={handleEdit}
              //   href={`mailto:${address?.email}`}
              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-1 rounded-bl-lg border border-transparent py-4 text-xs font-semibold text-gray-900 hover:bg-gray-100 hover:text-gray-900"
            >
              <PencilIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              {common_dictionary.edit}
            </button>
          </div>
          <div
            className="inline-flex w-0  flex-1 items-center justify-center hover:bg-gray-100 hover:text-gray-900 "
            //   className="-ml-px flex w-0 flex-1">
          >
            {/* <button
              //   href={`tel:${address?.telephone}`}
              className="hover:bg-gray-100 hover:text-gray-900 relative inline-flex w-0 flex-1 items-center justify-center gap-x-1 rounded-br-lg border border-transparent py-4 text-xs  font-semibold text-gray-900"
            >
              <EllipsisVerticalIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              Περισσότερα
            </button> */}
            <MoreButton address={address} dictionary={dictionary} />
          </div>
        </div>
      </div>
    </li>
  );
}
