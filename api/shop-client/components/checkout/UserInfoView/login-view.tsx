import { useState } from 'react';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import { useUI } from '@/components/ui/context';
import { validate } from 'email-validator';
import s from './UserInfoView.module.css';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import GoogleButton from '@/components/auth/google-button';
import { useRouter } from 'next/navigation';
import { Dictionary } from '@/lib/get-dictionary';
import { Customer } from '@/lib/vendure/generated/graphql-shop';
import { loginMutation } from '@/lib/vendure/shop/account/account';
import { LINKS } from '@/lib/constants';

const { link_password_reset_request } = LINKS;

type LoginType = {
  email: string;
  password: string;
};

type Props = {
  customer: Customer;
  dictionary: Dictionary;
};

const LoginView = ({ customer, dictionary }: Props) => {
  const router = useRouter();
  const common_dictionary = dictionary.common;
  //   const checkout_dictionary = dictionary.checkout;

  //   const { data: cartData, isLoading: isLoadingCart } = useCart();
  //   const customer = customerData;

  const login = async ({ email, password }: LoginType) => {
    const res = await loginMutation(email, password, false);
    await router.refresh();
    return res;
  };
  const isGuest = !!customer;
  //   const [isGuest, setIsGuest] = useState(!!customer);

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { setModalView, openModal } = useUI();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginType>({
    defaultValues: { email: '', password: '' },
    mode: 'onBlur'
  });

  //   const logout = useLogout();

  const onSubmit = async (data: LoginType) => {
    try {
      setLoading(true);
      const res = await login({
        email: data?.email,
        password: data?.password
      });
      if (res.login.__typename === 'CurrentUser') {
        toast.success(common_dictionary.login_success);
        router.refresh();
      } else if (res.login.__typename === 'NotVerifiedError') {
        toast.error(common_dictionary.NotVerifiedError);
      } else if (res.login.__typename === 'InvalidCredentialsError') {
        toast.error(common_dictionary.wrong_password);
      } else {
        toast.error(common_dictionary.error);
      }
    } catch (err: any) {
      toast.error(common_dictionary.error);
    }finally{
      setLoading(false);
      setDisabled(false);
    }
  };
  //   const handleLogout = async (e: React.SyntheticEvent<EventTarget>) => {
  //     e.preventDefault();

  //     try {
  //       setLoading(true);

  //       await logout();
  //       setLoading(false);
  //     } catch ({ errors }: any) {
  //       if (errors instanceof Array) {
  //         //     setMessage(errors.map((e: any) => e.message).join('<br/>'))
  //         //   } else {
  //         toast.error(common_dictionary.logout_error!);
  //       }
  //       setLoading(false);
  //       setDisabled(false);
  //     }
  //   };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {!isGuest && !!!customer && (
          <div className="mt-4">
            <div className="mt-4 grid grid-cols-1">
              <div className={s.fieldset}>
                <FormInput
                  {...register('email', {
                    required: common_dictionary.not_empty!,
                    validate: validate
                  })}
                  type="email"
                  placeholder="Email"
                  error={errors.email && errors.email?.message}
                />
              </div>
              <div className={s.fieldset}>
                <FormInput
                  type="password"
                  placeholder={common_dictionary.password}
                  {...register('password', {
                    required: common_dictionary.not_empty
                  })}
                  error={errors.password && errors.password?.message}
                />
              </div>
              <Button
                className="mt-4 h-10"
                variant="slim"
                type="submit"
                loading={loading}
                disabled={disabled}
              >
                {common_dictionary.login}
              </Button>
            </div>

            <div className="pt-2 text-sm">
              <span className="text-accent-7">{common_dictionary.no_account}</span>
              {` `}
              <a
                className="text-accent-9 cursor-pointer font-bold hover:underline"
                onClick={() => {
                  setModalView('SIGNUP_VIEW');
                  openModal();
                }}
              >
                {common_dictionary.signup}
              </a>
              <button
                onClick={() => {
                  router.push(link_password_reset_request);
                }}
                className="text-accent-9 block cursor-pointer font-bold hover:underline "
              >
                {common_dictionary.forget_password}
              </button>
              {process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED && (
                <>
                  <div className=" text-center">-{common_dictionary.or}-</div>
                  <div className="mt-2">
                    <GoogleButton dictionary={dictionary} />
                  </div>
                </>
              )}
            </div>
          </div>
        )}

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
          </div>
        )}
      </form>
    </>
  );
};

export default LoginView;
