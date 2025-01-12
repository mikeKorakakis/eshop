// 'use client';
// import { useEffect, useState } from 'react';
// import cn, { clsx } from 'clsx';

// // import useAddCard from '@framework/customer/card/use-add-item'
// import Button from '@/components/ui/Button';
// // import Loading from '@/components/ui/Loading';

// import s from './address-view.module.css';
// import ShippingAddressView from '../ShippingAddressView';
// import Tabs from '@/components/ui/Tabs';
// import type { CheckoutType } from '@/lib/types';
// import FormInput from '@/components/ui/FormInput';
// import FormSelect from '@/components/ui/FormSelect';
// import { useForm } from 'react-hook-form';
// import toast from 'react-hot-toast';
// // import { useAddShippingAddress, useAddBillingddress } from '@framework/checkout';
// import { Dictionary } from '@/lib/get-dictionary';
// import { Address, Order, OrderAddress } from '@/lib/vendure/generated/graphql-shop';
// import { countries, getCountryCode } from '@/lib/utils';
// import {
//   setOrderBillingAddressMutation,
//   setOrderShippingAddressMutation
// } from '@/lib/vendure/shop/orders/order';
// import { isShippingBillingSame } from '@/components/profile/AddressesView/addresses-view';
// import { LINKS } from '@/lib/constants';
// import { useRouter } from 'next/navigation';
// import { refreshCart } from '../actions';

// const { link_checkout_general, link_checkout_shipping } = LINKS;

// type SetAddresType = {
//   type: string;
//   firstName: string;
//   lastName: string;
//   company: string;
//   streetNumber: string;
//   postalCode: string;
//   city: string;
//   country: string;
//   phoneNumber: string;
//   province: string;
//   defaultShippingAddress: boolean;
//   defaultBillingAddress: boolean;
// };

// // const invalidAddress = (address?: Address | null) => {
// //   return (
// //     !address?.fullName ||
// //     !address?.streetNumber ||
// //     !address?.postalCode ||
// //     !address?.city ||
// //     !address?.country ||
// //     !address?.phoneNumber ||
// //     !address?.province
// //   );
// // };

// interface Props {
//   dictionary: Dictionary;
//   //   setStep: Dispatch<SetStateAction<number>>;
//   order: Order;
//   addresses?: Address[];
// }

// const AddressView = ({ dictionary, order, addresses }: Props) => {
//   const common_dictionary = dictionary.common;
//   const checkout_dictionary = dictionary.checkout;
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   //   const addShippingAddress = useAddShippingAddress();
//   const addShippingAddress = async ({
//     firstName,
//     lastName,
//     company,
//     streetNumber,
//     postalCode,
//     city,
//     country,
//     phoneNumber,
//     province,
//     defaultShippingAddress
//   }: SetAddresType) =>
//     await setOrderShippingAddressMutation({
//       fullName: `${firstName} ${lastName}`,
//       company,
//       streetLine1: streetNumber,
//       postalCode,
//       city,
//       countryCode: getCountryCode(country) || 'GR',
//       phoneNumber,
//       province,
//       defaultShippingAddress
//     });

//   const addBillingAddress = async ({
//     firstName,
//     lastName,
//     company,
//     streetNumber,
//     postalCode,
//     city,
//     country,
//     phoneNumber,
//     province,
//     defaultShippingAddress,
//     defaultBillingAddress
//   }: SetAddresType) =>
//     await setOrderBillingAddressMutation({
//       fullName: `${firstName} ${lastName}`,
//       company,
//       streetLine1: streetNumber,
//       postalCode,
//       city,
//       countryCode: getCountryCode(country) || 'GR',
//       phoneNumber,
//       province,
//       defaultShippingAddress,
//       defaultBillingAddress
//     });
//   const [sameAsShipping, setSameAsShipping] = useState(true);
//   const [shipping, setShipping] = useState(false);
//   const tabs = [
//     {
//       name: common_dictionary.billing_address,
//       onClick: () => setShipping(false),
//       current: !shipping
//     },
//     {
//       name: common_dictionary.shipping_address,
//       onClick: () => setShipping(true),
//       current: shipping
//     }
//   ];

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.checked) {
//       setShipping(false);
//       setSameAsShipping(true);
//     } else {
//       setShipping(true);
//       setSameAsShipping(false);
//     }
//   };

//   const orderData = order;
//   //   const { data: customerData, isLoading: isLoadingCustomer } = useCustomer();
//   //   const { data: orderData, isLoading: isLoadingCart } = useCart();
//   const orderShippingAddress = orderData?.shippingAddress;
//   const orderBillingAddress = orderData?.billingAddress;

//   const billingAddress =
//     addresses && addresses?.filter((address) => address?.defaultBillingAddress)[0];

//   const shippingAddress =
//     addresses && addresses?.filter((address) => address?.defaultShippingAddress)[0];

//   //   const [country, setCountry] = useState('')

//   useEffect(() => {
//     if (orderBillingAddress && orderShippingAddress) {
//       if (isOrderShippingBillingSame(orderBillingAddress, orderShippingAddress)) {
//         setSameAsShipping(true);
//       } else {
//         setSameAsShipping(false);
//       }
//     } else if (billingAddress && shippingAddress) {
//       if (isShippingBillingSame(billingAddress, shippingAddress)) {
//         setSameAsShipping(true);
//       } else {
//         setSameAsShipping(false);
//       }
//     } else {
//       setSameAsShipping(false);
//     }
//   }, [orderBillingAddress, orderShippingAddress, billingAddress, shippingAddress]);

//   //   const billingId = billingAddress && billingAddress?.id;
//   const billingFirstName = billingAddress && billingAddress?.fullName?.split(' ')[0];
//   const billingLastName = billingAddress && billingAddress?.fullName?.split(' ')[1];
//   const billingCompany = billingAddress && billingAddress?.company;
//   const billingStreetNumber = billingAddress && billingAddress?.streetLine1;
//   const billingPostalCode = billingAddress && billingAddress?.postalCode;
//   const billingCity = billingAddress && billingAddress?.city;
//   const billingCountry = billingAddress && billingAddress?.country.code;
//   const billingPhoneNumber = billingAddress && billingAddress?.phoneNumber;
//   const billingProvince = billingAddress && billingAddress?.province;

//   //   const shippingId = shippingAddress && shippingAddress?.id;
//   const shippingFirstName = shippingAddress && shippingAddress?.fullName?.split(' ')[0];
//   const shippingLastName = shippingAddress && shippingAddress?.fullName?.split(' ')[1];
//   const shippingCompany = shippingAddress && shippingAddress?.company;
//   const shippingStreetNumber = shippingAddress && shippingAddress?.streetLine1;
//   const shippingPostalCode = shippingAddress && shippingAddress?.postalCode;
//   const shippingCity = shippingAddress && shippingAddress?.city;
//   const shippingCountry = shippingAddress && shippingAddress?.country.code;
//   const shippingPhoneNumber = shippingAddress && shippingAddress?.phoneNumber;
//   const shippingProvince = shippingAddress && shippingAddress?.province;

//   const {
//     register,
//     formState: { errors, isValid },
//     reset,
//     handleSubmit
//   } = useForm<CheckoutType>({
//     defaultValues: {
//       billingFirstName: billingFirstName || '',
//       billingLastName: billingLastName || '',
//       billingCompany: billingCompany || '',
//       billingStreetNumber: billingStreetNumber || '',
//       billingPostalCode: billingPostalCode || '',
//       billingCity: billingCity || '',
//       billingCountry: billingCountry || 'GR',
//       billingPhoneNumber: billingPhoneNumber || '',
//       billingProvince: billingProvince || '',
//       shippingFirstName: shippingFirstName || '',
//       shippingLastName: shippingLastName || '',
//       shippingCompany: shippingCompany || '',
//       shippingStreetNumber: shippingStreetNumber || '',
//       shippingPostalCode: shippingPostalCode || '',
//       shippingCity: shippingCity || '',
//       shippingCountry: shippingCountry || 'GR',
//       shippingPhoneNumber: shippingPhoneNumber || '',
//       shippingProvince: shippingProvince || ''
//     },
//     mode: 'onBlur'
//   });

//   useEffect(() => {
//     if (
//       errors.shippingCity ||
//       errors.shippingCountry ||
//       errors.shippingFirstName ||
//       errors.shippingLastName ||
//       errors.shippingPhoneNumber ||
//       errors.shippingPostalCode ||
//       errors.shippingProvince ||
//       errors.shippingStreetNumber ||
//       errors.shippingCountry
//     ) {
//       setShipping(true);
//     }
//     if (
//       errors.billingCity ||
//       errors.billingCountry ||
//       errors.billingFirstName ||
//       errors.billingLastName ||
//       errors.billingPhoneNumber ||
//       errors.billingPostalCode ||
//       errors.billingProvince ||
//       errors.billingStreetNumber ||
//       errors.billingCountry
//     ) {
//       setShipping(false);
//     }
//   }, [
//     errors.shippingCity,
//     errors.shippingCountry,
//     errors.shippingFirstName,
//     errors.shippingLastName,
//     errors.shippingPhoneNumber,
//     errors.shippingPostalCode,
//     errors.shippingProvince,
//     errors.shippingStreetNumber,
//     errors.billingCity,
//     // errors.billingCountry,
//     errors.billingFirstName,
//     errors.billingLastName,
//     errors.billingPhoneNumber,
//     errors.billingPostalCode,
//     errors.billingProvince,
//     errors.billingStreetNumber,
//     errors.billingCountry
//   ]);

//   useEffect(() => {
//     reset({
//       billingFirstName: orderBillingAddress?.fullName?.split(' ')[0] || billingFirstName || '',
//       billingLastName: orderBillingAddress?.fullName?.split(' ')[1] || billingLastName || '',
//       billingCompany: orderBillingAddress?.company || billingCompany || '',
//       billingStreetNumber: orderBillingAddress?.streetLine1 || billingStreetNumber || '',
//       billingPostalCode: orderBillingAddress?.postalCode || billingPostalCode || '',
//       billingCity: orderBillingAddress?.city || billingCity || '',
//       billingCountry:
//         getCountryCode(orderBillingAddress?.country as string) || (billingCountry as string) || '',
//       billingPhoneNumber: orderBillingAddress?.phoneNumber || billingPhoneNumber || '',
//       billingProvince: orderBillingAddress?.province || billingProvince || '',
//       shippingFirstName: orderShippingAddress?.fullName?.split(' ')[0] || shippingFirstName || '',
//       shippingLastName: orderShippingAddress?.fullName?.split(' ')[1] || shippingLastName || '',
//       shippingCompany: orderShippingAddress?.company || shippingCompany || '',
//       shippingStreetNumber: orderShippingAddress?.streetLine1 || shippingStreetNumber || '',
//       shippingPostalCode: orderShippingAddress?.postalCode || shippingPostalCode || '',
//       shippingCity: orderShippingAddress?.city || shippingCity || '',
//       shippingCountry:
//         getCountryCode(orderShippingAddress?.country as string) ||
//         (shippingCountry as string) ||
//         '',
//       shippingPhoneNumber: orderShippingAddress?.phoneNumber || shippingPhoneNumber || '',
//       shippingProvince: orderShippingAddress?.province || shippingProvince || ''
//     });
//   }, [
//     addresses,
//     orderBillingAddress,
//     orderShippingAddress,
//     billingAddress,
//     shippingAddress,
//     billingCity,
//     billingCompany,
//     billingCountry,
//     billingFirstName,
//     billingLastName,
//     billingPhoneNumber,
//     billingPostalCode,
//     billingProvince,
//     billingStreetNumber,
//     reset,
//     shippingCity,
//     shippingCompany,
//     shippingCountry,
//     shippingFirstName,
//     shippingLastName,
//     shippingPhoneNumber,
//     shippingPostalCode,
//     shippingProvince,
//     shippingStreetNumber
//   ]);

//   const onSubmit = async (data: CheckoutType) => {
//     setLoading(true);
//     let billingFirstName = '';
//     let billingLastName = '';
//     let billingCompany = '';
//     let billingStreetNumber = '';
//     let billingPostalCode = '';
//     let billingCity = '';
//     let billingCountry = '';
//     let billingPhoneNumber = '';
//     let billingProvince = '';
//     let shippingFirstName = '';
//     let shippingLastName = '';
//     let shippingCompany = '';
//     let shippingStreetNumber = '';
//     let shippingPostalCode = '';
//     let shippingCity = '';
//     let shippingCountry = '';
//     let shippingPhoneNumber = '';
//     let shippingProvince = '';
//     // const email = '';
//     try {
//       billingFirstName = data.billingFirstName;
//       billingLastName = data.billingLastName;
//       billingCompany = data.billingCompany;
//       billingStreetNumber = data.billingStreetNumber;
//       billingPostalCode = data.billingPostalCode;
//       billingCity = data.billingCity;
//       billingCountry = data.billingCountry;
//       billingPhoneNumber = data.billingPhoneNumber;
//       billingProvince = data.billingProvince;

//       shippingFirstName = sameAsShipping ? data.billingFirstName : data.shippingFirstName;
//       shippingLastName = sameAsShipping ? data.billingLastName : data.shippingLastName;
//       shippingCompany = sameAsShipping ? data.billingCompany : data.shippingCompany;
//       shippingStreetNumber = sameAsShipping ? data.billingStreetNumber : data.shippingStreetNumber;
//       shippingPostalCode = sameAsShipping ? data.billingPostalCode : data.shippingPostalCode;
//       shippingCity = sameAsShipping ? data.billingCity : data.shippingCity;
//       shippingCountry = sameAsShipping ? data.billingCountry : data.shippingCountry;
//       shippingPhoneNumber = sameAsShipping ? data.billingPhoneNumber : data.shippingPhoneNumber;
//       shippingProvince = sameAsShipping ? data.billingProvince : data.shippingProvince;

//       const res = await addBillingAddress({
//         type: 'billing',
//         firstName: billingFirstName,
//         lastName: billingLastName,
//         company: billingCompany,
//         streetNumber: billingStreetNumber,
//         postalCode: billingPostalCode,
//         city: billingCity,
//         country: billingCountry,
//         phoneNumber: billingPhoneNumber,
//         province: billingProvince,
//         defaultBillingAddress: true,
//         defaultShippingAddress: false
//       });
//       if (!sameAsShipping) {
//         await addShippingAddress({
//           type: 'shipping',
//           firstName: shippingFirstName,
//           lastName: shippingLastName,
//           company: shippingCompany,
//           streetNumber: shippingStreetNumber,
//           postalCode: shippingPostalCode,
//           city: shippingCity,
//           country: shippingCountry,
//           phoneNumber: shippingPhoneNumber,
//           province: shippingProvince,
//           defaultShippingAddress: true,
//           defaultBillingAddress: false
//         });
//       } else {
//         await addShippingAddress({
//           type: 'shipping',
//           firstName: billingFirstName,
//           lastName: billingLastName,
//           company: billingCompany,
//           streetNumber: billingStreetNumber,
//           postalCode: billingPostalCode,
//           city: billingCity,
//           country: billingCountry,
//           phoneNumber: billingPhoneNumber,
//           province: billingProvince,
//           defaultShippingAddress: true,
//           defaultBillingAddress: true
//         });
//       }

//       if (res?.__typename === 'Order') {
//         // setStep(2);
//         await refreshCart();
//         router.push(link_checkout_shipping);
//       } else {
//         toast.error(common_dictionary.error);
//       }

//       // toast.success(sameAsShipping?'true':"false")
//     } catch (err) {
//       console.log(err);
//       toast.error(checkout_dictionary.submit_error.toString());
//     } finally {
//       setLoading(false);
//     }
//   };
//   //   const nextButtonDisabled =
//   //     invalidAddress(orderBillingAddress) || (sameAsShipping && invalidAddress(orderShippingAddress));
//   //   if (isLoadingCart || isLoadingCustomer) return <Loading />;

//   return (
//     <form className="" onSubmit={handleSubmit(onSubmit)}>
//       <h2 className="text-lg font-medium text-gray-900">{checkout_dictionary.addresses}</h2>
//       <div className="flex space-x-2 mt-8">
//         <label htmlFor="same-as-shipping" className="text-accent-9 font-bold">
//           {common_dictionary.shipping_billing_same}
//         </label>
//         <div className="flex items-center">
//           <input
//             onChange={handleChange}
//             checked={sameAsShipping}
//             type="checkbox"
//             className="rounded border-gray-300 text-red-600 focus:ring-red-500"
//           />
//         </div>
//       </div>

//       {!sameAsShipping && (
//         <>
//           <Tabs tabs={tabs} className="mt-8" />
//           <ShippingAddressView
//             dictionary={dictionary}
//             register={register}
//             errors={errors}
//             show={shipping}
//           />
//         </>
//       )}
//       <div
//         className={clsx('h-full', shipping && 'hidden')}
//         // onSubmit={handleSubmit}
//       >
//         <div className="mt-8">
//           <h2 className="text-lg font-medium text-gray-900">{common_dictionary.billing_address}</h2>
//           <div className="flex-1">
//             <div>
//               <hr className="border-accent-2 my-6" />
//               <div className="grid-cols-12 sm:grid sm:grid-flow-row sm:gap-3">
//                 <div className={cn(s.fieldset, 'col-span-6')}>
//                   <FormInput
//                     {...register('billingFirstName', {
//                       required: common_dictionary.not_empty!
//                     })}
//                     error={
//                       errors?.billingFirstName && (errors?.billingFirstName?.message as string)
//                     }
//                     label={common_dictionary.f_name!}
//                   />
//                 </div>
//                 <div className={cn(s.fieldset, 'col-span-6')}>
//                   <FormInput
//                     {...register('billingLastName', {
//                       required: common_dictionary.not_empty!
//                     })}
//                     error={errors?.billingLastName?.message as string}
//                     label={common_dictionary.l_name!}
//                   />
//                 </div>
//               </div>
//               <div className={s.fieldset}>
//                 <FormInput
//                   {...register('billingCompany')}
//                   error={errors?.billingCompany?.message as string}
//                   label={`${common_dictionary.company} (${common_dictionary.optional})`}
//                 />
//               </div>
//               <div className={s.fieldset}>
//                 <FormInput
//                   {...register('billingStreetNumber', {
//                     required: common_dictionary.not_empty!
//                   })}
//                   error={errors?.billingStreetNumber?.message as string}
//                   label={common_dictionary.street_number!}
//                 />
//               </div>
//               <div className="grid-cols-12 sm:grid sm:grid-flow-row sm:gap-3">
//                 <div className={cn(s.fieldset, 'col-span-6')}>
//                   <FormInput
//                     {...register('billingPhoneNumber', {
//                       required: common_dictionary.not_empty!
//                     })}
//                     error={errors?.billingPhoneNumber?.message as string}
//                     label={common_dictionary.phone!}
//                   />
//                 </div>
//                 <div className={cn(s.fieldset, 'col-span-6')}>
//                   <FormInput
//                     {...register('billingProvince')}
//                     error={errors?.billingProvince?.message as string}
//                     label={common_dictionary.province!}
//                   />
//                 </div>
//               </div>
//               <div className="grid-cols-12 sm:grid sm:grid-flow-row sm:gap-3">
//                 <div className={cn(s.fieldset, 'col-span-6')}>
//                   <FormInput
//                     {...register('billingPostalCode', {
//                       required: common_dictionary.not_empty!
//                     })}
//                     error={errors?.billingPostalCode?.message as string}
//                     label={common_dictionary.postal_code!}
//                   />
//                 </div>
//                 <div className={cn(s.fieldset, 'col-span-6')}>
//                   <FormInput
//                     {...register('billingCity', {
//                       required: common_dictionary.not_empty!
//                     })}
//                     error={errors?.billingCity?.message as string}
//                     label={common_dictionary.city!}
//                   />
//                 </div>
//               </div>
//               <div className={s.fieldset}>
//                 <FormSelect
//                   dictionary={dictionary}
//                   //   onChangeCapture={(event: any) =>
//                   //     sameAsShipping && setCountry(event.target.value)
//                   //   }
//                   options={countries}
//                   {...register('billingCountry', {
//                     required: common_dictionary.not_empty!
//                   })}
//                   error={errors?.billingCountry?.message}
//                   label={common_dictionary.country!}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="grid grid-cols-1">
//         {/* <div className="mt-10">
//           <Button loading={loading} disabled={loading} type="submit">
//             {common_dictionary.save}
//           </Button>
//         </div> */}
//         <div className="mt-10 grid grid-cols-1 gap-2 sm:grid-cols-2">
//           <Button
//             className="h-10"
//             variant="slim"
//             type="button"
//             // loading={loading}
//             // disabled={!customer && !orderCustomer}
//             // onClick={() => setStep(0)}
//             onClick={() => router.push(link_checkout_general)}
//           >
//             {common_dictionary.back}
//           </Button>
//           <Button
//             className="h-10"
//             variant="slim"
//             type="submit"
//             loading={loading}
//             // disabled={!customer && !orderCustomer}
//             disabled={!isValid}
//             // onClick={() => setStep(2)}
//           >
//             {common_dictionary.next}
//           </Button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default AddressView;

// export const isOrderShippingBillingSame = (
//   shippingAddress: OrderAddress,
//   billingAddress: OrderAddress
// ) => {
//   return (
//     shippingAddress.fullName === billingAddress.fullName &&
//     shippingAddress.company === billingAddress.company &&
//     shippingAddress.streetLine1 === billingAddress.streetLine1 &&
//     shippingAddress.phoneNumber === billingAddress.phoneNumber &&
//     shippingAddress.province === billingAddress.province &&
//     shippingAddress.postalCode === billingAddress.postalCode &&
//     shippingAddress.city === billingAddress.city &&
//     shippingAddress.country === billingAddress.country
//   );
// };
