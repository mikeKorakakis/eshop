import { FC } from 'react';
import cn, { clsx } from 'clsx';

import s from './shipping-address-view.module.css';
import FormInput from '@/components/ui/FormInput';
import FormSelect from '@/components/ui/FormSelect';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { CheckoutType } from '@/lib/types';
import { countries } from '@/lib/dfsfsdfdfdf';
import { Dictionary } from '@/lib/get-dictionary';

// interface Form extends HTMLFormElement {
//   cardHolder: HTMLInputElement
//   cardNumber: HTMLInputElement
//   cardExpireDate: HTMLInputElement
//   cardCvc: HTMLInputElement
//   firstName: HTMLInputElement
//   lastName: HTMLInputElement
//   company: HTMLInputElement
//   streetNumber: HTMLInputElement
//   zipCode: HTMLInputElement
//   city: HTMLInputElement
//   country: HTMLSelectElement
// }

interface Props {
  show: boolean;
  errors: FieldErrors<CheckoutType>;
  register: UseFormRegister<CheckoutType>;
  dictionary: Dictionary;
}

const ShippingAddressView: FC<Props> = ({ register, errors, show, dictionary }) => {
  const common_dictionary = dictionary.common;

  //   async function handleSubmit(event: React.ChangeEvent<Form>) {
  //     event.preventDefault()

  //     // await addAddress({
  //     //   type: event?.target?.type?.value,
  //     //   firstName: event?.target?.firstName?.value,
  //     //   lastName: event?.target?.lastName?.value,
  //     //   company: event?.target?.company?.value,
  //     //   streetNumber: event?.target?.streetNumber?.value,
  //     //   apartments: event?.target?.streetNumber?.value,
  //     //   zipCode: event?.target?.zipCode?.value,
  //     //   city: event?.target?.city?.value,
  //     //   country: event?.target?.country?.value,
  //     // })
  //   }

  return (
    <div className={clsx('h-full', !show && 'hidden')}>
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">{common_dictionary.shipping_address}</h2>

        <div>
          <hr className="my-6 border-accent-2" />
          <div className="grid-cols-12 sm:grid sm:grid-flow-row sm:gap-3">
            <div className={cn(s.fieldset, 'col-span-6')}>
              <FormInput
                {...register('shippingFirstName', {
                  required: common_dictionary.not_empty!
                })}
                error={errors?.shippingFirstName && errors?.shippingFirstName?.message}
                label={common_dictionary.f_name!}
              />
            </div>
            <div className={cn(s.fieldset, 'col-span-6')}>
              <FormInput
                {...register('shippingLastName', {
                  required: common_dictionary.not_empty!
                })}
                error={errors?.shippingLastName?.message}
                label={common_dictionary.l_name!}
              />
            </div>
          </div>
          <div className={s.fieldset}>
            <FormInput
              {...register('shippingCompany')}
              error={errors?.shippingCompany?.message}
              label={`${common_dictionary.company} (${common_dictionary.optional})`}
            />
          </div>
          <div className={s.fieldset}>
            <FormInput
              {...register('shippingStreetNumber', {
                required: common_dictionary.not_empty!
              })}
              error={errors?.shippingStreetNumber?.message}
              label={common_dictionary.street_number!}
            />
          </div>
          <div className="grid-cols-12 sm:grid sm:grid-flow-row sm:gap-3">
            <div className={cn(s.fieldset, 'col-span-6')}>
              <FormInput
                {...register('shippingPhoneNumber', {
                  required: common_dictionary.not_empty!
                })}
                error={errors?.shippingPhoneNumber?.message}
                label={common_dictionary.phone!}
              />
            </div>
            <div className={cn(s.fieldset, 'col-span-6')}>
              <FormInput
                {...register('shippingProvince')}
                error={errors?.shippingProvince?.message}
                label={common_dictionary.province!}
              />
            </div>
          </div>
          <div className="grid-cols-12 sm:grid sm:grid-flow-row sm:gap-3">
            <div className={cn(s.fieldset, 'col-span-6')}>
              <FormInput
                {...register('shippingPostalCode', {
                  required: common_dictionary.not_empty!
                })}
                error={errors?.shippingPostalCode?.message}
                label={common_dictionary.postal_code!}
              />
            </div>
            <div className={cn(s.fieldset, 'col-span-6')}>
              <FormInput
                {...register('shippingCity', {
                  required: common_dictionary.not_empty!
                })}
                error={errors?.shippingCity?.message}
                label={common_dictionary.city!}
              />
            </div>
          </div>
          <div className={s.fieldset}>
            <FormSelect
              dictionary={dictionary}
              //   onChangeCapture={(event: any) => setCountry(event.target.value)}
              options={countries}
              {...register('shippingCountry', {
                required: common_dictionary.not_empty!
              })}
              error={errors?.shippingCountry?.message}
              label={common_dictionary.country!}
            />
          </div>
        </div>
      </div>
      {/* <div className="sticky z-20 bottom-0 w-full right-0 left-0 py-12 bg-accent-0 border-t border-accent-2 px-6">
        <Button type="submit" width="100%">
          Continue
        </Button>
      </div> */}
    </div>
  );
};

export default ShippingAddressView;
