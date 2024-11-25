// 'use client';
import { LINKS } from '@/lib/constants';
import Image from 'next/image';
import emailImage from '@/assets/images/email.png';
import successImage from '@/assets/images/success.png';
import errorImage from '@/assets/images/error.png';
import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import LoadingDots from '@/components/ui/LoadingDots';
// import { useCustomer } from '@framework/customer';
import BreadCrumbs from '@/components/ui/BreadCrumbs';
import { LanguageProps } from '@/lib/types';
import { Dictionary, getDictionary } from '@/lib/get-dictionary';
import { verifyCustomerAccountMutation } from '@/lib/vendure/shop/account/account';
import { getActiveCustomerQuery } from '@/lib/vendure/shop/customer/customer';

const { link_search } = LINKS;

type Props = { searchParams: { token: string } } & LanguageProps;

export default async function Verify({ params: { lang }, searchParams: { token } }: Props) {
  // const dictionary = await getDictionary(lang);
  // const customer = await getActiveCustomerQuery();
  const [dictionary, customer] = await Promise.all([getDictionary(lang), getActiveCustomerQuery()]);

  const verifyAccount = async ({ token }: { token: string }) => {
    const { verifyCustomerAccount } = await verifyCustomerAccountMutation(token);
    return verifyCustomerAccount;
  };

  const common_dictionary = dictionary.common;
  //   const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState('');
  //   const { data: customer, isLoading } = useCustomer();

  //   useEffect(() => {
  //     if (token) {
  //       setLoading(true);
  //       const verify = async () => {
  //         try {
  //           await verifyAccount({ token: token! as string });
  //         } catch (err: any) {
  //           setError(err.message);
  //         }
  //       };
  //       verify();
  //       setLoading(false);
  //     }
  //   }, [token]);
  let error = '';
  if (token) {
    try {
      const res = await verifyAccount({ token: token! as string });
      if (res.__typename === 'VerificationTokenInvalidError') {
        error = common_dictionary.token_incorrect;
      }
    } catch (err: any) {
      error = err.message;
    }
  }

  const expireMessage =
    error === 'Verification token not recognized'
      ? common_dictionary.token_incorrect
      : common_dictionary.token_expired;

  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full">
          <body class="h-full">
          ```
        */}
      <div className="absolute z-10 mt-6 w-full">
        <div className="relative mx-auto max-w-screen-2xl px-6">
          <BreadCrumbs
            navigation={[
              { name: common_dictionary.home!, href: '/' },
              { name: common_dictionary.verify_account }
            ]}
          />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        <div className="flex h-96 justify-center">
          {customer ? (
            <ErrorMessage error={common_dictionary.already_logged_in} dictionary={dictionary} />
          ) : token ? (
            // loading ? (
            //   <LoadingDots />
            // ) :
            error ? (
              <ErrorMessage error={expireMessage} dictionary={dictionary} />
            ) : (
              <SucessMessage dictionary={dictionary} />
            )
          ) : (
            <VerifyMessage dictionary={dictionary} />
          )}
        </div>
      </div>
    </>
  );
}

const VerifyMessage = ({ dictionary }: { dictionary: Dictionary }) => {
  const common_dictionary = dictionary.common;
  const verify_dictionary = dictionary.verify;
  return (
    <div className="flex flex-col items-center pt-20">
      <Image src={emailImage} alt="Empty cart" width={120} height={120} className="w-24 " />
      {/* <div className="flex items-center justify-center h-12 w-12 rounded-md bg-zinc-100">
                <ShoppingBagIcon
                  className="h-6 w-6 text-zinc-600"
                  aria-hidden="true"
                />
              </div> */}
      <div className="mt-3 text-center sm:mt-5">
        <h3 className="text-lg font-medium leading-6 ">{verify_dictionary.verify_header}</h3>
        <div className="mt-2">
          <p className="text-sm text-gray-500">{verify_dictionary.verify_description}</p>
        </div>
        <div className="mt-6">
          <Link
            href={link_search}
            className="text-sm font-medium text-zinc-600 hover:text-zinc-500"
          >
            {common_dictionary.go_back_shopping}
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const SucessMessage = ({ dictionary }: { dictionary: Dictionary }) => {
  const common_dictionary = dictionary.common;
  const verify_dictionary = dictionary.verify;

  return (
    <div className="flex flex-col items-center pt-20">
      <Image src={successImage} alt="Empty cart" width={120} height={120} className="w-24 " />
      {/* <div className="flex items-center justify-center h-12 w-12 rounded-md bg-zinc-100">
                  <ShoppingBagIcon
                    className="h-6 w-6 text-zinc-600"
                    aria-hidden="true"
                  />
                </div> */}
      <div className="mt-3 text-center sm:mt-5">
        <h3 className="text-lg font-medium leading-6 ">
          {verify_dictionary.account_verified_header}
        </h3>
        <div className="mt-2">
          <p className="text-sm text-gray-500">{verify_dictionary.account_verified_description}</p>
        </div>
        <div className="mt-6">
          <Link
            href={link_search}
            className="text-sm font-medium text-zinc-600 hover:text-zinc-500"
          >
            {common_dictionary.go_back_shopping}
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const ErrorMessage = ({ error, dictionary }: { error: string; dictionary: Dictionary }) => {
  const common_dictionary = dictionary.common;
  const verify_dictionary = dictionary.verify;

  return (
    <div className="flex flex-col items-center pt-20">
      <Image src={errorImage} alt="Empty cart" width={120} height={120} className="w-24 " />
      {/* <div className="flex items-center justify-center h-12 w-12 rounded-md bg-zinc-100">
                  <ShoppingBagIcon
                    className="h-6 w-6 text-zinc-600"
                    aria-hidden="true"
                  />
                </div> */}
      <div className="mt-3 text-center sm:mt-5">
        <h3 className="text-lg font-medium leading-6 ">
          {verify_dictionary.account_verified_error_header}
        </h3>
        <div className="mt-2">
          <p className="text-sm text-gray-500">{error}</p>
        </div>
        <div className="mt-6">
          <Link
            href={link_search}
            className="text-sm font-medium text-zinc-600 hover:text-zinc-500"
          >
            {common_dictionary.go_back_shopping}
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
