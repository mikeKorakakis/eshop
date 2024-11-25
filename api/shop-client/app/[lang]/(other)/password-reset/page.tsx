import BreadCrumbs from '@/components/ui/BreadCrumbs';
import { getDictionary } from '@/lib/get-dictionary';
import { LanguageProps } from '@/lib/types';
import { getActiveCustomerQuery } from '@/lib/vendure/shop/customer/customer';
import ResetPassword from './reset-password';
import ErrorMessage from './error-message';

type Props = { searchParams: { token: string } } & LanguageProps;

export default async function PasswordReset({ params: { lang }, searchParams: { token } }: Props) {
  //   const dictionary = await getDictionary(lang);
  //   const customer = await getActiveCustomerQuery();
  const [dictionary, customer] = await Promise.all([getDictionary(lang), getActiveCustomerQuery()]);
  const common_dictionary = dictionary.common;
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
              { name: common_dictionary.recover_password, href: '#' }
            ]}
          />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        <div className="flex h-96 justify-center">
          {customer ? (
            <ErrorMessage error={common_dictionary.already_logged_in} dictionary={dictionary} />
          ) : token ? (
            <ResetPassword token={token as string} dictionary={dictionary} />
          ) : (
            <ErrorMessage error={common_dictionary.no_token!} dictionary={dictionary} />
          )}
        </div>
      </div>
    </>
  );
}

// const SucessMessage = () => {
//   const { openModal } = useUI()

//   return (
//     <div className="flex flex-col items-center pt-20">
//       <Image
//         src={successImage}
//         alt="Empty cart"
//         width={120}
//         height={120}
//         className="w-24"
//       />
//       {/* <div className="flex items-center justify-center h-12 w-12 rounded-md bg-zinc-100">
//                   <ShoppingBagIcon
//                     className="h-6 w-6 text-zinc-600"
//                     aria-hidden="true"
//                   />
//                 </div> */}
//       <div className="mt-3 text-center sm:mt-5">
//         <h3 className="text-lg leading-6 font-medium ">
//           {t("password_reset_success_header")}
//         </h3>
//         <div className="mt-2">
//           <p className="text-sm text-gray-500">
//             You can now login with your new password
//           </p>
//         </div>
//         <div className="mt-6">
//           <button
//             // href={link_search}
//             onClick={() => openModal()}
//             className="text-sm font-medium text-zinc-600 hover:text-zinc-500"
//           >
//             Login<span aria-hidden="true"> &rarr;</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }
