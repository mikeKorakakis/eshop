import { Dictionary } from '@/lib/get-dictionary';
import { useForm } from 'react-hook-form';
import s from './address-form.module.css';
import { useUI } from '@/components/ui/ui-context';
import { Address, UpdateAddressInput } from '@/lib/vendure/generated/graphql-shop';
import { useState } from 'react';
import clsx from 'clsx';
import {
  createCustomerAddressMutation,
  updateCustomerAddressMutation
} from '@/lib/vendure/shop/customer/customer';
import toast from 'react-hot-toast';
import FormInput from '@/components/ui/FormInput';
import FormSelect from '@/components/ui/FormSelect';
import Button from '@/components/ui/Button';
import { countries, normalizeAddress } from '@/lib/utils';
import { revalidateTag } from 'next/cache';
import { TAGS } from '@/lib/constants';
import { AddressType } from '@/lib/types';
import { createAddress, updateAddress } from '../actions';

type Props = {
  dictionary: Dictionary;
};

export default function AddressForm({ dictionary }: Props) {
  const common_dictionary = dictionary.common;
  const profile_dictionary = dictionary.profile;
  const { payload, closeModal } = useUI();
  const [loading, setLoading] = useState(false);

  const payload_address = payload as Address;
  const address = normalizeAddress(payload_address);

  //
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<AddressType>({
    defaultValues: {
      ...address
    },
    mode: 'onBlur'
  });

  const onSubmit = async (data: AddressType) => {
    try {
      setLoading(true);
      if (payload_address) {
        const res = await updateAddress({ address: data, id: payload_address.id });
        if (res.updateCustomerAddress.__typename === 'Address') {
          toast.success(profile_dictionary.update_adddress_success);
        } else {
          toast.error(profile_dictionary.update_adddress_error);
        }
      } else {
        const res = await createAddress({ address: data });
        if (res.createCustomerAddress.__typename === 'Address') {
          toast.success(profile_dictionary.create_adddress_success);
        } else {
          toast.error(profile_dictionary.create_adddress_error);
        }
      }
      closeModal();
    } catch (error: unknown) {
      toast.error(common_dictionary.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="lg:col-span-9" method="POST" onSubmit={handleSubmit(onSubmit)}>
      <div className="">
        <div className="mt-2 ">
          <div
            className={clsx('h-full')}
            // onSubmit={handleSubmit}
          >
            <div className="mt-4">
              <div className="flex-1">
                <div>
                  <div className="grid-cols-12 sm:grid sm:grid-flow-row sm:gap-3">
                    <div className={clsx(s.fieldset, 'col-span-6')}>
                      <FormInput
                        {...register('firstName', {
                          required: common_dictionary.not_empty!
                        })}
                        error={errors?.firstName && errors?.firstName?.message}
                        label={common_dictionary.f_name!}
                      />
                    </div>
                    <div className={clsx(s.fieldset, 'col-span-6')}>
                      <FormInput
                        {...register('lastName', {
                          required: common_dictionary.not_empty!
                        })}
                        error={errors?.lastName?.message}
                        label={common_dictionary.l_name!}
                      />
                    </div>
                  </div>
                  <div className={s.fieldset}>
                    <FormInput
                      {...register('company')}
                      error={errors?.company?.message}
                      label={`${common_dictionary.company} (${common_dictionary.optional})`}
                    />
                  </div>
                  <div className={s.fieldset}>
                    <FormInput
                      {...register('streetNumber', {
                        required: common_dictionary.not_empty!
                      })}
                      error={errors?.streetNumber?.message}
                      label={common_dictionary.street_number!}
                    />
                  </div>
                  <div className="grid-cols-12 sm:grid sm:grid-flow-row sm:gap-3">
                    <div className={clsx(s.fieldset, 'col-span-6')}>
                      <FormInput
                        {...register('phoneNumber', {
                          required: common_dictionary.not_empty!
                        })}
                        error={errors?.phoneNumber?.message}
                        label={common_dictionary.phone!}
                      />
                    </div>
                    <div className={clsx(s.fieldset, 'col-span-6')}>
                      <FormInput
                        {...register('province')}
                        error={errors?.province?.message}
                        label={common_dictionary.province!}
                      />
                    </div>
                  </div>
                  <div className="grid-cols-12 sm:grid sm:grid-flow-row sm:gap-3">
                    <div className={clsx(s.fieldset, 'col-span-6')}>
                      <FormInput
                        {...register('postalCode', {
                          required: common_dictionary.not_empty!
                        })}
                        error={errors?.postalCode?.message}
                        label={common_dictionary.postal_code!}
                      />
                    </div>
                    <div className={clsx(s.fieldset, 'col-span-6')}>
                      <FormInput
                        {...register('city', {
                          required: common_dictionary.not_empty!
                        })}
                        error={errors?.city?.message}
                        label={common_dictionary.city!}
                      />
                    </div>
                  </div>
                  <div className={s.fieldset}>
                    <FormSelect
                      dictionary={dictionary}
                      options={countries}
                      {...register('country', {
                        required: common_dictionary.not_empty!
                      })}
                      error={errors?.country?.message}
                      label={common_dictionary.country!}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end px-4 py-4 sm:px-6 ">
        <div>
          <Button type="submit" className="h-10" loading={loading}>
            {common_dictionary.save}
          </Button>
        </div>
      </div>
    </form>
  );
}
