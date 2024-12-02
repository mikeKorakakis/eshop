'use client';
import { useEffect, useState } from 'react';
import FormInput from '@/components/ui/FormInput';
// import Loading from '@/components/ui/Loading';
import Button from '@/components/ui/Button/button';
// import useLogin from '@/framework/auth/use-login';
// import useLogout from '@/framework/auth/use-logout';
// import { validate } from 'email-validator';
import s from './UserInfoView.module.css';
import { emailPattern } from '@/components/auth/helpers';
import { useForm } from 'react-hook-form';
import { LINKS } from '@/lib/constants';
import Link from 'next/link';
import clsx from 'clsx';
// import { useAddCustomer } from '@/framework/checkout';
import toast from 'react-hot-toast';
// import LoginView from './login-view';
import { Dictionary } from '@/lib/get-dictionary';
import { useRouter } from 'next/navigation';

const { link_profile_addresses, link_checkout_payment } = LINKS;

type Props = {
  dictionary: Dictionary;
  //   setStep: React.Dispatch<React.SetStateAction<number>>;
//   customer: Customer;
//   order: Order;
};

interface CustomerBaseInfo {
  firstName: string;
  lastName: string;
  email: string;
}

const UserInfoView = ({ dictionary }: Props) => {
  const common_dictionary = dictionary.common;
  const checkout_dictionary = dictionary.checkout;
  const customer = {
	firstName: "mike",
	lastName: "kor",
	email: "mike@test.com"
  }
  const router = useRouter();
  //   const { data: customerData, isLoading: isLoadingCustomer } = useCustomer();

  //   const addCustomer = useAddCustomer();
  //   const { data: cartData, isLoading: isLoadingCart } = useCart();
  const orderCustomer = customer;
  const [isGuest, setIsGuest] = useState(!!customer);

  //   const [email, setEmail] = useState('');
  //   const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const addCustomer = async ({
    firstName,
    lastName,
    email
  }: {
    firstName: string;
    lastName: string;
    email: string;
  }) => {
    // return await setCustomerForOrderMutation({
    //   firstName,
    //   lastName,
    //   email: email
    // });
  };

  const logout = async () => {
    // await logoutMutation();
    router.refresh();
  };

  const {
    register,
    formState: { isValid, errors },
    reset,
    handleSubmit
  } = useForm<CustomerBaseInfo>({
    defaultValues: {
      firstName: customer?.firstName || '',
      lastName: customer?.lastName || '',
      email: customer?.email || ''
    },
    mode: 'onBlur'
  });

//   useEffect(() => {
//     if (customer) {
//       setIsGuest(false);
//       reset({
//         firstName: customer.firstName || '',
//         lastName: customer.lastName || '',
//         email: customer.email || ''
//       });
//     }
//     if (orderCustomer && !customer) {
//       reset({
//         firstName: orderCustomer.firstName || '',
//         lastName: orderCustomer.lastName || '',
//         email: orderCustomer.email || ''
//       });
//       setIsGuest(true);
//     }
//   }, [customer, orderCustomer, reset]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setIsGuest(true);
    } else {
      setIsGuest(false);
    }
  };

  //   const handleLogin = async (e: React.SyntheticEvent<EventTarget>) => {
  //     if (!dirty && !disabled) {
  //       setDirty(true)
  //       handleValidation()
  //     }

  //     try {
  //       setLoading(true)
  //       await login({
  //         email,
  //         password,
  //       })
  //       setLoading(false)
  //     } catch ({ errors }: any) {
  //       //   if (errors instanceof Array) {
  //       //     toast.error(errors.map((e: any) => e.message).join('<br/>'))
  //       //   } else {
  //       toast.error(common_dictionary.wrong_password)
  //       //   }
  //       setLoading(false)
  //       setDisabled(false)
  //     }
  //   }

  const handleLogout = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    if (!dirty && !disabled) {
      setDirty(true);
      //   handleValidation();
    }

    try {
      setLoading(true);

      await logout();
      setLoading(false);
    } catch ({ errors }: any) {
      if (errors instanceof Array) {
        //     setMessage(errors.map((e: any) => e.message).join('<br/>'))
        //   } else {
        toast.error(common_dictionary.logout_error!);
      }
      setLoading(false);
      setDisabled(false);
    }
  };

  const onSubmit = async (data: CustomerBaseInfo) => {
    try {
      if (!customer) {
        setLoading(true);
        const res = await addCustomer({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email
        });
      
      } else {
        // setStep(1);
      }
      setLoading(false);
      //   toast.success(common_dictionary.success_save)
    } catch ({ errors }: any) {
      (errors as any).forEach((e: any) => {
        console.log(e);
        // toast.error(common_dictionary[`${e.message}`]);
      });

      setLoading(false);
      setDisabled(false);
    }
    setLoading(false);
  };

  //   const handleValidation = useCallback(() => {
  //     // Test for Alphanumeric password
  //     const validPassword = passwordPattern.test(password);

  //     // Unable to send form unless fields are valid.
  //     if (dirty) {
  //       const notValid = !validate(email) || !validPassword;
  //       setDisabled(notValid);
  //     }
  //   }, [email, password, dirty]);

  //   useEffect(() => {
  //     handleValidation();
  //   }, [handleValidation]);

  //   if (isLoadingCustomer || isLoadingCart) <Loading />;

  return (
    <>
      <div>
        <div>
          <h2 className="text-lg font-medium text-gray-900">{checkout_dictionary.customer_info}</h2>
          {/* {message && <ErrorMessage error={{ message }} className=" mt-4" />} */}
          {customer?.email && (
            <>
              <div className="mt-8">
                <div className="">
                  <h2 className="text-lg font-medium text-gray-900">
                    {/* {checkout_dictionary.welcome_back} */}
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    {checkout_dictionary.logged_in_as} {customer.firstName} {customer.lastName} (
                    {customer.email})
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    {checkout_dictionary.set_address}{' '}
                    <Link href={link_profile_addresses} className="text-red-500 underline">
                      {checkout_dictionary.here}
                    </Link>
                    <button
                      className="ml-4 inline-block text-red-500 underline"
                      type="button"
                      onClick={handleLogout}
                    >
                      {common_dictionary.logout}
                    </button>
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
        <div>
          {!isGuest && !!!customer && (<div></div>
            // <LoginView dictionary={dictionary} customer={customer} />
            // <div className="mt-4">
            //   <div className="mt-4 grid grid-cols-1">
            //     <div className={s.fieldset}>
            //       <FormInput
            //         type="email"
            //         name="email"
            //         label="Email"
            //         onChange={(e) => setEmail(e.target.value)}
            //         error={"test"}
            //       />
            //     </div>
            //     <div className={s.fieldset}>
            //       <FormInput
            //         type="password"
            //         label={common_dictionary.password!}
            //         name="password"
            //         onChange={(e) => setPassword(e.target.value)}
            //       />
            //     </div>
            //     <Button
            //       className="mt-4 h-10"
            //       variant="slim"
            //       type="button"
            //       loading={loading}
            //       disabled={disabled}
            //       onClick={handleLogin}
            //     >
            //       {common_dictionary.login}
            //     </Button>
            //   </div>

            //   <div className="pt-2 text-sm">
            //     <span className="text-accent-7">{common_dictionary.no_account}</span>
            //     {` `}
            //     <a
            //       className="text-accent-9 font-bold hover:underline cursor-pointer"
            //       onClick={() =>{ setModalView('SIGNUP_VIEW'); openModal()}}
            //     >
            //       {common_dictionary.signup}
            //     </a>
            //   </div>
            // </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            {isGuest && !customer && (
              <div className="mt-4">
                {/* {true && (
                <div className="text-red border border-red p-3">
                  {message}.
                  <a
                    className="text-accent-9 inline font-bold hover:underline cursor-pointer"
                    onClick={() => setModalView('FORGOT_VIEW')}
                  >
                    {common_dictionary.forget_password}
                  </a>
                </div>
              )} */}
                <div className="mt-4 grid grid-cols-1">
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
                        error={errors?.lastName && errors?.lastName?.message}
                        label={common_dictionary.l_name!}
                      />
                    </div>
                  </div>
                  <div className={s.fieldset}>
                    <FormInput
                      type="email"
                      label="Email"
                      {...register('email', {
                        required: common_dictionary.not_empty!,
                        pattern: {
                          value: emailPattern,
                          message: common_dictionary.email_invalid
                        }
                      })}
                      error={errors?.email?.message}
                      //   onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            <>
              {!customer && (
                <div className="flex space-x-2 pt-4">
                  <label htmlFor="same-as-shipping" className="text-accent-9 font-bold">
                    {checkout_dictionary.guest_checkout}
                  </label>
                  <div className="flex items-center">
                    <input
                      checked={isGuest}
                      onChange={handleChange}
                      type="checkbox"
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                  </div>
                </div>
              )}
              <Button
                className="mt-10 h-10 w-full"
                variant="slim"
                type="submit"
                loading={loading}
                disabled={!isValid && !customer}
                onClick={() => router.push(link_checkout_payment)}
                //   onClick={() => setStep(1)}
              >
                {common_dictionary.next}
              </Button>
            </>
          </form>
        </div>
        {/* {isGuest && !customer && (
          <Button
            className="mt-10"
            variant="slim"
            type="submit"
            disabled={!isDirty || !isValid}
            // onClick={handleLogin}
          >
            {common_dictionary.save}
          </Button>
        )} */}
      </div>
    </>
  );
};

export default UserInfoView;
