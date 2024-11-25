import { setCookie } from '@/lib/cookie';
import { Dictionary } from '@/lib/get-dictionary';
// import useCart from '@framework/cart/use-cart'
import { usePathname } from 'next/navigation';
import React from 'react';

interface Props {
  dictionary: Dictionary;
}

export default function GoogleButton({ dictionary }: Props) {
  const common_dictionary = dictionary.common;
  const pathname = usePathname();
  //   const cart = useCart()
  //   const { data } = cart
  //   const items = data?.lineItems?.map((item) => ({ variantId: item.variantId, quantity: item.quantity })) ?? []
  return (
    <button
      type="button"
      onClick={() => {
        setCookie('redirect_url', process.env.NEXT_PUBLIC_FRONTEND_URL + pathname);
        // setCookie('cart', JSON.stringify(items));
        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?scope=openid%20email%20profile&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL}&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`;
      }}
      className="dark:focus:ring-[#4285F4]/55 mb-2 mr-2 inline-flex w-full items-center justify-center rounded-lg bg-[#4285F4] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#4285F4]/90 focus:ring-4 focus:ring-[#4285F4]/50"
    >
      <svg
        className="-ml-1 mr-2 h-4 w-4"
        aria-hidden="true"
        focusable="false"
        data-prefix="fab"
        data-icon="google"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 488 512"
      >
        <path
          fill="currentColor"
          d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
        ></path>
      </svg>
      {`${common_dictionary.signin_with} Google`}
    </button>
  );
}
