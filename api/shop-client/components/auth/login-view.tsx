'use client';
import { useState } from 'react';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import { useUI } from '@/components/ui/ui-context';
import { validate } from 'email-validator';
import { useForm } from 'react-hook-form';
import { LINKS } from '@/lib/constants';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import GoogleButton from './google-button';
import { Dictionary } from '@/lib/get-dictionary';
// import { loginMutation } from '@/lib/vendure/shop/account/account';

const { link_password_reset_request } = LINKS;
interface LoginType {
  email: string;
  password: string;
  rememberMe: boolean;
}

type Props = {
  dictionary: Dictionary;
};

const LoginView = ({ dictionary }: Props) => {
  const router = useRouter();
  //   const { t } = useTranslation('common')
  const common_dictionary = dictionary.common;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(false);
  const { setModalView, closeModal } = useUI();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginType>({
    defaultValues: { email: '', password: '' },
    mode: 'onBlur'
  });

  const login = async ({ email, password, rememberMe }: LoginType) => {
    // const { login } = await loginMutation(email, password, rememberMe);
    await router.refresh();
    return login;
  };
  //   const login = useLogin()

  const handleLogin = async (data: LoginType) => {
    try {
      setLoading(true);
      setMessage('');
      const res = await login({
        email: data?.email,
        password: data?.password,
        rememberMe: data?.rememberMe || false
      });
    //   if (res.__typename === 'InvalidCredentialsError') {
    //     throw new Error(res.__typename);
    //   }
      closeModal();
      toast.success(common_dictionary.login_success);
    } catch (err: any) {
      if (err.message === 'InvalidCredentialsError') {
        toast.error(common_dictionary.wrong_password!);
      } else {
        toast.error(common_dictionary.NotVerifiedError!);
      }
      //   if (errors instanceof Array) {
      //     setMessage(errors.map((e: any) => e.message).join('<br/>'))
      //   } else {
      //     setMessage('Unexpected error')
      //   }
      setLoading(false);
      setDisabled(false);
    } finally {
      setLoading(false);
      setDisabled(false);
    }
  };

  //   const handleValidation = useCallback(() => {
  //     // Test for Alphanumeric password
  //     const validPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)

  //     // Unable to send form unless fields are valid.
  //     if (dirty) {
  //       setDisabled(!validate(email) || password.length < 7 || !validPassword)
  //     }
  //   }, [email, password, dirty])

  //   useEffect(() => {
  //     handleValidation()
  //   }, [handleValidation])

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col justify-between w-full">
      <div className="flex justify-center pb-8 ">
        <Logo width="64px" height="64px" />
      </div>
      <div className="flex flex-col space-y-4">
        {message && (
          <div className="text-red border-red border p-3">
            {message}.
            <a
              className="inline cursor-pointer font-bold text-accent-9 hover:underline"
              onClick={() => setModalView('FORGOT_VIEW')}
            >
              {common_dictionary.forget_password}
            </a>
          </div>
        )}
        <FormInput
          {...register('email', {
            required: common_dictionary.not_empty!,
            validate: validate
          })}
          type="email"
          placeholder="Email"
          error={errors.email && errors.email?.message}
        />
        <FormInput
          type="password"
          placeholder={common_dictionary.password!}
          {...register('password', { required: common_dictionary.not_empty! })}
          error={errors.password && errors.password?.message}
        />

        <Button className="h-10" variant="slim" type="submit" loading={loading} disabled={disabled}>
          {common_dictionary.login}
        </Button>
        <div className="pt-1 text-center text-sm">
          <span className="text-accent-7">{common_dictionary.no_account}</span>
          {` `}
          <a
            className="cursor-pointer font-bold text-accent-9 hover:underline"
            onClick={() => setModalView('SIGNUP_VIEW')}
          >
            {common_dictionary.signup}
          </a>
          <button
            onClick={() => {
              closeModal();
              router.push(link_password_reset_request);
            }}
            className="mx-auto block cursor-pointer font-bold text-accent-9 hover:underline"
          >
            {common_dictionary.forget_password}
          </button>
          {process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED && (
            <>
              <div className="mt-2">-{common_dictionary.or}-</div>
              <div className="mt-2">
                <GoogleButton dictionary={dictionary} />
              </div>
            </>
          )}
        </div>
      </div>
    </form>
  );
};

export default LoginView;
