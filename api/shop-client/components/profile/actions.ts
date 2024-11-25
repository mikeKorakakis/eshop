'use server';

import {
  createCustomerAddressMutation,
  deleteCustomerAddressMutation,
  updateCustomerAddressMutation
} from '@/lib/vendure/shop/customer/customer';
import { TAGS } from 'lib/constants';
import { revalidateTag } from 'next/cache';
import { setCustomerAddressAsDefault } from './../../lib/vendure/shop/customer/customer';
import { AddressType } from '@/lib/types';
import { updateCustomerMutation } from '@/lib/vendure/shop/account/account';

type UpdateCustomerType = {
  firstName?: string | null;
  lastName?: string | null;
  phoneNumber?: string | null;
};

export async function updateCustomer(input: UpdateCustomerType) {
  const res = await updateCustomerMutation(input);
  revalidateTag(TAGS.customer);
  return res;
}

export async function deleteAddress({ id }: { id: string }) {
  const res = await deleteCustomerAddressMutation(id);
  revalidateTag(TAGS.addresses);
  return res
}

export const setAddressAsDefault = async ({ id, type }: { id: string; type: string }) => {
  await setCustomerAddressAsDefault(id, type);
  revalidateTag(TAGS.addresses);
};

export const updateAddress = async ({ address, id }: { address: AddressType; id: string }) => {
  const updateAddressInput = {
    fullName: `${address?.firstName} ${address?.lastName}`,
    company: address?.company,
    streetLine1: address?.streetNumber,
    postalCode: address?.postalCode,
    city: address?.city,
    province: address?.province,
    countryCode: address?.country,
    phoneNumber: address?.phoneNumber
  };
  const res = await updateCustomerAddressMutation({ id, ...updateAddressInput }, '');
  revalidateTag(TAGS.addresses);
  return res;
};

export const createAddress = async ({ address }: { address: AddressType }) => {
  const createAddressInput = {
    fullName: `${address?.firstName} ${address?.lastName}`,
    company: address?.company,
    streetLine1: address?.streetNumber,
    postalCode: address?.postalCode,
    city: address?.city,
    province: address?.province,
    countryCode: address?.country,
    phoneNumber: address?.phoneNumber
  };
  const res = await createCustomerAddressMutation(createAddressInput, '');
  revalidateTag(TAGS.addresses);
  return res;
};
