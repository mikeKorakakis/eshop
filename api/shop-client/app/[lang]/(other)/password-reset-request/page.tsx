import Image from 'next/image';
import successImage from '@/assets/images/success.png';
import errorImage from '@/assets/images/error.png';
import Link from 'next/link';
import BreadCrumbs from '@/components/ui/BreadCrumbs';
import { LanguageProps } from '@/lib/types';
import { Dictionary, getDictionary } from '@/lib/get-dictionary';
import RequestPasswordReset from './request-password-reset';
import { LINKS } from '@/lib/constants';
import { getActiveCustomerQuery } from '@/lib/vendure/shop/customer/customer';

const { link_search } = LINKS;
type Props = LanguageProps;

export default async function PasswordResetRequest({ params: { lang } }: Props) {
  //   const dictionary = await getDictionary(lang);
  // const customer = await getActiveCustomerQuery();

  const [dictionary, customer] = await Promise.all([getDictionary(lang), getActiveCustomerQuery()]);
  const common_dictionary = dictionary.common;
  
  return (
    <>
      <div className="absolute z-10 mt-6 w-full">
        <div className="relative mx-auto max-w-screen-2xl px-6">
          <BreadCrumbs
            navigation={[
              { name: common_dictionary.home!, href: '/' },
              { name: common_dictionary.recover_password, href: '#' }
            ]}
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        <div className="flex h-96 justify-center">
          {' '}
          {customer ? (
            <ErrorMessage dictionary={dictionary} />
          ) : (
            <RequestPasswordReset dictionary={dictionary}>
              <SucessMessage dictionary={dictionary} />
            </RequestPasswordReset>
          )}
        </div>
      </div>
    </>
  );
}

const SucessMessage = ({ dictionary }: { dictionary: Dictionary }) => {
  const common_dictionary = dictionary.common;
  const password_reset_request_dictionary = dictionary.password_reset_request;
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
          {password_reset_request_dictionary.request_password_reset_success!}
        </h3>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            {password_reset_request_dictionary.request_password_reset_success_description}
          </p>
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

const ErrorMessage = ({ dictionary }: { dictionary: Dictionary }) => {
  const common_dictionary = dictionary.common;
  const password_reset_request_dictionary = dictionary.password_reset_request;
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
          {password_reset_request_dictionary.request_password_reset_error!}
        </h3>
        <div className="mt-2">
          <p className="text-sm text-gray-500">{common_dictionary.already_logged_in}</p>
        </div>
        <div className="mt-6">
          <Link
            href={link_search}
            className="text-sm font-medium text-zinc-600 hover:text-zinc-500"
          >
            {common_dictionary.go_back_shopping!}
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
