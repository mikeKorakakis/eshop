'use client';
import { LINKS } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {  useForm } from 'react-hook-form';
import Image from 'next/image';
import lockImage from '@/assets/images/lock.png';
import FormInput from '@/components/ui/FormInput';
// import { Dictionary } from '@/lib/get-dictionary';
import Button from '@/components/ui/Button';
import { resetPasswordMutation } from '@/lib/vendure/shop/account/account';
import ErrorMessage from './error-message';
import toast from 'react-hot-toast';
import { useUI } from '@/components/ui/context';

const { link_search } = LINKS;

interface ResetPasswordProps {
  token: string;
  dictionary: any;
}

interface ResetPasswordType {
  token: string;
  password: string;
}

const ResetPassword = ({ token, dictionary }: ResetPasswordProps) => {
  const [error, setError] = useState('');
  const common_dictionary = dictionary.common;
  const reset_dictionary_dictionary = dictionary.password_reset;
  let expireMessage = '';
  const { setModalView, openModal } = useUI();

  switch (error) {
    case 'Password reset token not recognized':
      expireMessage = common_dictionary.token_incorrect!;
      break;
    case 'Password reset token has expired':
      expireMessage = common_dictionary.token_expired!;
      break;
    case 'Password is invalid':
      expireMessage = common_dictionary.password_invalid!;
      break;
    case 'Please verify this email address before logging in':
      expireMessage = common_dictionary.account_not_verified!;
    default:
      expireMessage = common_dictionary.error;
  }
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const resetPassword = async ({ token, password }: ResetPasswordType) => {
    await resetPasswordMutation(token, password);
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPasswordType>({
    defaultValues: { token: '', password: '' },
    mode: 'onBlur'
  });

  const onSubmit = async (data: { password: string }) => {
    try {
      setLoading(true);
      await resetPassword({
        token: token,
        password: data.password
      });
      setLoading(false);
      toast.success(common_dictionary.password_reset_success);
      setModalView('LOGIN_VIEW');
      openModal();
      router.push(link_search);
    } catch (errors: any) {
      setError(errors.errors[0].message);
      //   toast.error(expireMessage)
      setLoading(false);
    }
  };

  return error ? (
    <ErrorMessage error={expireMessage} dictionary={dictionary} />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex w-full flex-col items-center pt-20">
        <Image src={lockImage} alt="Empty cart" width={120} height={120} className="w-24 " />

        <div className="mt-3 flex w-full flex-col items-center text-center sm:mt-5">
          <h3 className="text-lg font-medium leading-6 ">
            {reset_dictionary_dictionary.password_reset_header}
          </h3>
          <div className="mt-6 w-full max-w-2xl gap-2 sm:flex ">
            <div className="w-full sm:w-3/5">
              <FormInput
                type="password"
                placeholder={common_dictionary.password!}
                {...register('password', {
                  required: { message: common_dictionary.not_empty!, value: true },
                  minLength: { value: 7, message: common_dictionary.longer_7! },
                  pattern: {
                    value: /^(?=.*[a-zA-Z])(?=.*[0-9])/,
                    message: common_dictionary.one_letter_one_number
                  }
                })}
                error={errors.password && errors.password?.message}
              />
            </div>
            <div className="mt-4 w-full sm:mt-0 sm:w-2/5 ">
              <Button variant="slim" className="h-10 w-full" type="submit" loading={loading}>
                {loading ? common_dictionary.loading : common_dictionary.submit}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ResetPassword;
