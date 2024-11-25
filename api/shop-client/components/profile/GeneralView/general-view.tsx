'use client';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';
import { validate } from 'email-validator';
import s from './general-view.module.css';
import toast from 'react-hot-toast';
import { Dictionary } from '@/lib/get-dictionary';
import { Customer } from '@/lib/vendure/generated/graphql-shop';
import { updateCustomer } from '../actions';

type ProfileType = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string | null;
};


type Props = {
  dictionary: Dictionary;
  customer: Customer;
};

export default function GeneralView({ dictionary, customer }: Props) {
  const common_dictionary = dictionary.common;
  const profile_dictionary = dictionary.profile;
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProfileType>({
    defaultValues: {
      email: customer?.emailAddress,
      firstName: customer?.firstName,
      lastName: customer?.lastName,
      phoneNumber: customer?.phoneNumber
    },
    mode: 'onBlur'
  });

  const onSubmit = async (data: ProfileType) => {
    setLoading(true);
    if (!customer) return;
    try {
      const res = await updateCustomer({
        firstName: data?.firstName,
        lastName: data?.lastName,
        phoneNumber: data?.phoneNumber
      });
      if (res.updateCustomer.__typename === 'Customer') {
        toast.success(profile_dictionary.profile_success);
      } else {
        toast.error(profile_dictionary.profile_error);
      }
    } catch (e) {
      toast.error(profile_dictionary.profile_error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="divide-y divide-gray-200 lg:col-span-9"
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Profile section */}
      {/* {JSON.stringify(customer)} */}
      <div className="px-4 py-6 sm:p-6 lg:pb-8">
        <div>
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            {profile_dictionary.profile}
          </h2>
          <p className="mt-1 text-sm text-gray-500">{profile_dictionary.profile_description}</p>
        </div>

        <div className="mt-8">
          <hr className="my-6 border-accent-2" />
          {/* <div className="flex-grow space-y-6"> */}
          <div className="grid-cols-12 sm:grid sm:grid-flow-row sm:gap-3">
            <div className={clsx(s.fieldset, 'col-span-12 sm:col-span-6')}>
              <FormInput
                type="email"
                disabled
                placeholder="Email"
                label="Email"
                {...register('email', {
                  required: common_dictionary.not_empty!,
                  validate: validate,
                    // message: () => common_dictionary.email_invalid!
                //   }
                })}
                error={errors?.email?.message}
              />
            </div>
          </div>
          <div className="grid-cols-12 sm:grid sm:grid-flow-row sm:gap-3">
            <div className={clsx(s.fieldset, 'col-span-12 sm:col-span-6')}>
              <FormInput
                type="text"
                label={common_dictionary.f_name!}
                placeholder={common_dictionary.f_name!}
                {...register('firstName', {
                  required: common_dictionary.not_empty!
                })}
                error={errors?.firstName?.message}
              />
            </div>
            <div className={clsx(s.fieldset, 'col-span-12 sm:col-span-6')}>
              <FormInput
                type="text"
                label={common_dictionary.l_name!}
                placeholder={common_dictionary.l_name!}
                {...register('lastName', {
                  required: common_dictionary.not_empty!
                })}
                error={errors?.lastName?.message}
              />
            </div>
            {/* <div className="sm:grid sm:gap-3 sm:grid-flow-row grid-cols-12">
            </div> */}
          </div>
          <div className="grid-cols-12 sm:grid sm:grid-flow-row sm:gap-3">
            <div className={clsx(s.fieldset, 'col-span-12 sm:col-span-6')}>
              <FormInput
                type="phone"
                placeholder={common_dictionary.phone!}
                label={common_dictionary.phone!}
                {...register('phoneNumber', {
                  required: common_dictionary.not_empty!
                })}
                error={errors?.phoneNumber?.message}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Privacy section */}
      <div className="divide-y divide-gray-200 pt-6">
        <div className="mt-4 flex justify-end px-4 py-4 sm:px-6 ">
          <div>
            <Button type="submit" className="h-10" loading={loading}>
              {common_dictionary.save!}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
