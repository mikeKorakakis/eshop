'use client';
import { FC } from 'react';
import Button from '@/components/ui/Button';

import { Dictionary } from '@/lib/get-dictionary';
import { Address } from '@/lib/vendure/generated/graphql-shop';

import AddressItem from './address-item';
import { useUI } from '@/components/ui/context';

interface Props {
  dictionary: Dictionary;
  addresses?: Address[];
}

const AddressView: FC<Props> = ({ dictionary, addresses }) => {
  const profile_dictionary = dictionary.profile;
  const { openModal, setModalView, setPayload } = useUI();

  const handleCreate = () => {
    setPayload(null);
    setModalView('CREATE_UPDATE_ADDRESS_VIEW');
    openModal();
  };


  return (
    <div className="divide-y divide-gray-200 lg:col-span-9 ">
      <div className="px-4 py-6 sm:p-6 lg:pb-8">
        <div>
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            {profile_dictionary.addresses}
          </h2>
          <p className="mt-1 text-sm text-gray-500">{profile_dictionary.address_description}</p>
        </div>
        {!addresses && (
          <div className="flex py-6  lg:pb-96 ">
            <div className="flex items-center">{profile_dictionary.no_addresses}</div>
            <div className="flex-grow"></div>
            <Button
              type="reset"
              className="h-10"
              onClick={handleCreate}
              variant="slim"
            >
              {profile_dictionary.add_address}
            </Button>
          </div>
        )}
      </div>
      {addresses && (
        <div className="flex flex-col">
          <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            <div className="hidden sm:block"></div>
            <div className="hidden lg:block"></div>
            <Button
              type="reset"
              className="h-10"
              onClick={handleCreate}
              disabled={addresses && addresses.length >= 6}
              variant="slim"
            >
              {profile_dictionary.add_address}
            </Button>
          </div>
          <ul
            role="list"
            className="mb-40 grid w-full grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
          >
            {addresses?.map((address) => (
              <AddressItem address={address} dictionary={dictionary} key={address.id} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddressView;

export const isShippingBillingSame = (shippingAddress: Address, billingAddress: Address) => {
  return (
    shippingAddress?.fullName === billingAddress?.fullName &&
    shippingAddress?.company === billingAddress?.company &&
    shippingAddress?.streetLine1 === billingAddress?.streetLine1 &&
    shippingAddress?.phoneNumber === billingAddress?.phoneNumber &&
    shippingAddress?.province === billingAddress?.province &&
    shippingAddress?.postalCode === billingAddress?.postalCode &&
    shippingAddress?.city === billingAddress?.city &&
    shippingAddress?.country === billingAddress?.country
  );
};
