'use client'
import { FC, useState } from 'react';
// import { validate } from 'email-validator'
import { Info } from '@/components/icons';
import { useUI } from '@/components/ui/context';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';

// import useSignup from '@framework/auth/use-signup'; must_fix_framework
// import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { LINKS } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import { emailPattern } from './helpers';
import GoogleButton from './google-button';
import { Dictionary } from '@/lib/get-dictionary';

const { link_verify } = LINKS;
interface Props {
  dictionary: Dictionary;
}
interface SignUpType {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const SignUpView: FC<Props> = ({ dictionary }: Props) => {
  // Form State
  //   const { t } = useTranslation('common');
  const common_dictionary = dictionary.common;
  const [loading, setLoading] = useState(false);
  //   const [message, setMessage] = useState('')
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpType>({
    defaultValues: { email: '', password: '', firstName: '', lastName: '' },
    mode: 'onBlur'
  });

  const { setModalView, closeModal } = useUI();
//   useEffect(() => {
//     return () => {
//       setModalView('LOGIN_VIEW');
//     };
//   }, [setModalView]);

  //   const signup = useSignup(); must_fix_framework
  const signup = async ({email, password, firstName, lastName }: SignUpType) => {
    const registerCustomerAccount = () => {}
    return registerCustomerAccount;
  };

  const handleSignup = async (data: SignUpType) => {
    try {
      setLoading(true);
      //   setMessage('')
      await signup({
        email: data?.email,
        firstName: data?.firstName,
        lastName: data?.lastName,
        password: data?.password,
      });
      setLoading(false);
      closeModal();

      router.push(link_verify);
    } catch (err) {
      console.error(err);
      //   if (errors instanceof Array) {
      //     setMessage(errors.map((e: any) => e.message).join('<br/>'))
      //   } else {
      //     setMessage('Unexpected error')
      //   }
      toast.error(common_dictionary.error);
      setLoading(false);
      setDisabled(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSignup)} className="flex w-80 flex-col justify-between w-full">
      <div className="flex justify-center pb-8 ">
        <Logo width="64px" height="64px" />
      </div>
      <div className="flex flex-col space-y-4">
        {/* {message && (
          <div
            className="text-red border border-red p-3"
            dangerouslySetInnerHTML={{
              __html: message,
            }}
          ></div>
        )} */}
        <FormInput
          type="text"
          placeholder={common_dictionary.f_name!}
          {...register('firstName', {
            required: common_dictionary.not_empty!
          })}
          error={errors.firstName && errors.firstName?.message}
        />
        <FormInput
          type="text"
          placeholder={common_dictionary.l_name!}
          {...register('lastName', {
            required: common_dictionary.not_empty!
          })}
          error={errors.lastName && errors.lastName?.message}
        />
        <FormInput
          type="email"
          placeholder="Email"
          {...register('email', {
            required: common_dictionary.not_empty!,
            pattern: {
              value: emailPattern,
              message: common_dictionary.email_invalid
            }
          })}
          error={errors.email && errors.email?.message}
        />
        <FormInput
          type="password"
          placeholder={common_dictionary.password!}
          {...register('password', {
            required: common_dictionary.not_empty!,
            minLength: { value: 7, message: common_dictionary.longer_7! },
            pattern: {
              value: /^(?=.*[a-zA-Z])(?=.*[0-9])/,
              message: common_dictionary.one_letter_one_number!
            }
          })}
          error={errors.password && errors.password?.message}
        />

        <span className="text-accent-8">
          <span className="inline-block align-middle ">
            <Info width="15" height="15" />
          </span>{' '}
          <span className="text-sm leading-6">
            <strong>Info</strong>: {common_dictionary.signup_info}{' '}
          </span>
        </span>
        <div className="flex w-full flex-col pt-2">
          <Button
            className="h-10"
            variant="slim"
            type="submit"
            loading={loading}
            disabled={disabled}
          >
            {common_dictionary.signup}
          </Button>
        </div>

        <span className="pt-1 text-center text-sm">
          <span className="text-accent-7">{common_dictionary.have_account}</span>
          {` `}
          <a
            className="cursor-pointer font-bold text-accent-9 hover:underline"
            onClick={() => setModalView('LOGIN_VIEW')}
          >
            {common_dictionary.login}
          </a>

          {process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED && (
            <>
              <div className="mt-2">-{common_dictionary.or}-</div>
              <div className="mt-2">
                <GoogleButton dictionary={dictionary} />
              </div>
            </>
          )}
        </span>
      </div>
    </form>
  );
};

export default SignUpView;
