'use client'
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import { Dictionary } from '@/lib/get-dictionary';
import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { validate } from 'email-validator';
import { useForm } from 'react-hook-form';
import emailImage from '@/assets/images/email.png';
import { requestPasswordResetMutation } from '@/lib/vendure/shop/account/account';

type Props = {
  dictionary: Dictionary;
  children: React.ReactNode;
};

interface PasswordResetRequestType {
  emailAddress: string;
}

const RequestPasswordReset = ({ dictionary, children }: Props) => {
  const common_dictionary = dictionary.common;
  const password_reset_request_dictionary = dictionary.password_reset_request;
  const [loading, setLoading] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PasswordResetRequestType>({
    defaultValues: { emailAddress: '' },
    mode: 'onBlur'
  });

  const requestPasswordReset = async ({ emailAddress }: { emailAddress: string }) =>
    await requestPasswordResetMutation(emailAddress);

  const onSubmit = async (data: PasswordResetRequestType) => {
    try {
      setLoading(true);
      await requestPasswordReset({
        emailAddress: data?.emailAddress
      });
      setRequestSent(true);
      setLoading(false);
    } catch (error: unknown) {
      toast.error(common_dictionary.error);
      setLoading(false);
    }
  };
  return (
    <>
      {requestSent ? (
        children 
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center pt-20">
            <Image src={emailImage} alt="Empty cart" width={120} height={120} className="w-24 " />
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg font-medium leading-6 ">
                {password_reset_request_dictionary.request_password_reset}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  {password_reset_request_dictionary.description}
                </p>
              </div>
              <div className="mt-6 flex w-full max-w-2xl flex-col gap-2 sm:flex-row ">
                <div className="sm:w-3/5">
                  <FormInput
                    type="text"
                    placeholder="Email"
                    className="w-full "
                    {...register('emailAddress', {
                      required: common_dictionary.not_empty!,
                      validate: validate
                    })}
                    error={errors.emailAddress && errors.emailAddress?.message}
                  />
                </div>
                <div className="w-full sm:w-2/5">
                  <Button variant="slim" className="h-10 w-full" type="submit" loading={loading}>
                    {loading ? common_dictionary.loading : common_dictionary.submit}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default RequestPasswordReset;
