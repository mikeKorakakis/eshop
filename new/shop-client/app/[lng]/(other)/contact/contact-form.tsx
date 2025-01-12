'use client';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import FormTextArea from '@/components/ui/FormTextArea';
import { emailPattern } from '@/components/auth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Dictionary } from '@/lib/get-dictionary';

interface ContactType {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

type Props = {
  dictionary: Dictionary;
};

export default function ContactForm({ dictionary }: Props) {
  const common_dictionary = dictionary.common;
  const {
    register,
    formState: { errors, isValid },
    reset,
    handleSubmit
  } = useForm<ContactType>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: ''
    },
    mode: 'onBlur'
  });

  const onSubmit = async (data: ContactType) => {
    try {
      const res = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        throw new Error('Something went wrong');
      } else {
        toast.success(common_dictionary.message_sent);
      }
    } catch (err) {
      console.log(err);
      toast.error(common_dictionary.message_error);
    }
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-6 pb-10 pt-20 sm:pb-32 lg:px-8 lg:pb-20 lg:pt-28"
    >
      <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <FormInput
              {...register('firstName', {
                required: common_dictionary.not_empty!
              })}
              error={errors?.firstName && errors?.firstName?.message}
              label={common_dictionary.f_name!}
            />
          </div>
          <div>
            <FormInput
              {...register('lastName', {
                required: common_dictionary.not_empty!
              })}
              error={errors?.lastName?.message}
              label={common_dictionary.l_name!}
            />
          </div>
          <div className="sm:col-span-2">
            <FormInput
              type="email"
              label="Email"
              {...register('email', {
                required: common_dictionary.not_empty!,
                pattern: {
                  value: emailPattern,
                  message: common_dictionary.email_invalid
                }
              })}
              error={errors?.email?.message}
            />
          </div>
          <div className="sm:col-span-2">
            <FormInput
              {...register('phone', {
                required: common_dictionary.not_empty!
              })}
              error={errors?.phone?.message}
              label={common_dictionary.phone!}
            />
          </div>
          <div className="sm:col-span-2">
            <FormTextArea
              {...register('message', {
                required: common_dictionary.not_empty!
              })}
              rows={4}
              error={errors?.message?.message}
              label={common_dictionary.message!}
            />
          </div>
        </div>
        <div className="mt-8 flex justify-end ">
          <Button
            className="w-min"
            type="submit"
            // loading={loading}
            // disabled={!customer && !orderCustomer}
            disabled={!isValid}
            // onClick={() => setStep(2)}
          >
            {common_dictionary.send_message}
          </Button>
        </div>
      </div>
    </form>
  );
}
