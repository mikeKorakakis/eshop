'use client';

import { Menu, Transition } from '@headlessui/react';
import {
  CreditCardIcon,
  TruckIcon,
  EllipsisVerticalIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Fragment, useState } from 'react';
import { deleteAddress, setAddressAsDefault } from '../actions';
import { Address } from '@/lib/vendure/generated/graphql-shop';
import LoadingDots from '@/components//ui/LoadingDots';
import toast from 'react-hot-toast';
import { Dictionary } from '@/lib/get-dictionary';
import { useUI } from '@/components/ui/ui-context';

type Props = {
  address: Address;
  dictionary: Dictionary;
};

export const MoreButton = ({ address, dictionary }: Props) => {
  const [loading, setLoading] = useState(false);
  const common_dictionary = dictionary.common;
  const profile_dictionary = dictionary.profile;
  const { openModal, setModalView, setPayload, closeModal } = useUI();

  const handleDeleteAddress = async () => {
    if (!address) return;
    const res = await deleteAddress({ id: address.id });
    if (res.deleteCustomerAddress.success) {
      toast.success(profile_dictionary.delete_address_success);
    } else {
      toast.error(profile_dictionary.delete_address_error);
    }
    closeModal();
  };

  const handleDelete = async () => {
    if (address.defaultBillingAddress || address.defaultShippingAddress) {
      toast.error(profile_dictionary.delete_address_billing_shippping_error);
      return;
    }
    setPayload(handleDeleteAddress);
    setModalView('DELETE_ADDRESS_CONFIRMATION_VIEW');
    openModal();
  };

  const editAddressButtonOptions = [
    {
      disabled: (address: Address) => address.defaultBillingAddress === true,
      name: profile_dictionary.set_as_billing_address,
      icon: CreditCardIcon,
      onClick: async (id: string) => await setAddressAsDefault({ id, type: 'billing' })
    },
    {
      disabled: (address: Address) => address.defaultShippingAddress === true,
      name: profile_dictionary.set_as_shipping_address,
      icon: TruckIcon,
      onClick: async (id: string) => await setAddressAsDefault({ id, type: 'shipping' })
    }
  ];

  return (
    <Menu as="div" className="relative flex-shrink-0">
      <div>
        <Menu.Button className="relative inline-flex w-full flex-1 items-center justify-center gap-x-1 rounded-br-lg border border-transparent py-4 text-xs  font-semibold text-gray-900">
            {loading ? (
              <LoadingDots className="m-[1px] h-1 w-1" />
            ) : (
              <EllipsisVerticalIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            )}
            {common_dictionary.more}
          {/* <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" /> */}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {editAddressButtonOptions.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <button
                  onClick={async () => {
                    setLoading(true);
                    await item.onClick(address?.id);
                    setLoading(false);
                  }}
                  disabled={item.disabled(address)}
                  className={clsx(
                    'w-full cursor-pointer',
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    item.disabled(address) && 'cursor-not-allowed opacity-50',
                    'group flex items-center px-4 py-2 text-left text-sm'
                  )}
                >
                  <item.icon
                    className={clsx(
                      'mr-3 h-5 w-5 text-gray-400',
                      !item.disabled(address) && 'group-hover:text-gray-500'
                    )}
                  />
                  {item.name}
                </button>
              )}
            </Menu.Item>
          ))}
          <div className="border-t border-gray-200">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleDelete}
                  className={clsx(
                    'w-full cursor-pointer',
                    active ? 'bg-red-100 text-red-500' : 'text-red-400',
                    'group flex items-center px-4 py-2 text-left text-sm'
                  )}
                >
                  <TrashIcon className="mr-2 h-5 w-5 text-red-400 group-hover:text-red-500" />
                  {common_dictionary.delete}
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
