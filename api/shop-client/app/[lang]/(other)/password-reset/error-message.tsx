import { Dictionary } from '@/lib/get-dictionary';
import Image from 'next/image';
import Link from 'next/link';
import { LINKS } from '@/lib/constants'
import errorImage from '@/assets/images/error.png';


const { link_search } = LINKS;


type ErrorMessageProps = {
  dictionary: Dictionary;
  error: string;
};
export default function ErrorMessage({ error, dictionary }: ErrorMessageProps) {
  const reset_password_dictionary = dictionary.password_reset;
  const common_dictionary = dictionary.common;

  return (
    <>
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
            {reset_password_dictionary.password_reset_error_header}
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
    </>
  );
}
