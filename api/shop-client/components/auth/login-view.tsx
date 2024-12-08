'use client';
import { useState } from 'react';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import { useUI } from '@/components/ui/ui-context';
import { validate } from 'email-validator';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Dictionary } from '@/lib/get-dictionary';

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

  const login = async ({ email, password }: LoginType) => {
    // const { login } = await loginMutation(email, password, rememberMe);
    await router.refresh();
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
   
      closeModal();
      toast.success(common_dictionary.login_success);
    } catch (err: any) {
      if (err.message === 'InvalidCredentialsError') {
        toast.error(common_dictionary.wrong_password!);
      } else {
        toast.error(common_dictionary.NotVerifiedError!);
      }
     
	  
      setLoading(false);
      setDisabled(false);
    } finally {
      setLoading(false);
      setDisabled(false);
    }
  };

 

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
          label="Email"
          error={errors.email && errors.email?.message}
        />
        <FormInput
          type="password"
          label={common_dictionary.password!}
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
                 
        </div>
      </div>
    </form>
  );
};

export default LoginView;
