'use client'
import { FC, useEffect, useState, useCallback } from 'react';
import { validate } from 'email-validator';
import { useUI } from '@/components/ui/context';
import Logo from '@/components/ui/Logo/logo';
import Button from '@/components/ui/Button/button';
import Input from '@/components/ui/Input/input';
import { Dictionary } from '@/lib/get-dictionary';

type Props = {
    dictionary: Dictionary;
}

const ForgotPassword: FC<Props> = ({dictionary}) => {
  // Form State
  const common_dictionary = dictionary.common;
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [dirty, setDirty] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const { setModalView, closeModal } = useUI();

  const handleResetPassword = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    setLoading(true);

    if (!dirty && !disabled) {
      setDirty(true);
      handleValidation();
    }
    setLoading(false);
  };

  const handleValidation = useCallback(() => {
    // Unable to send form unless fields are valid.
    if (dirty) {
      setDisabled(!validate(email));
      setMessage(!validate(email) ? common_dictionary.email_invalid : '');
    }
  }, [email, dirty, common_dictionary.email_invalid]);

  useEffect(() => {
    handleValidation();
  }, [handleValidation]);

  return (
    <form onSubmit={handleResetPassword} className="flex w-80 flex-col justify-between p-3">
      <div className="flex justify-center pb-12 ">
        <Logo width="64px" height="64px" />
      </div>
      <div className="flex flex-col space-y-4">
        {message && <div className="text-red border-red border p-3">{message}</div>}

        <Input placeholder="Email" onChange={setEmail} type="email" />
        <div className="flex w-full flex-col pt-2">
          <Button
            className="h-10"
            variant="slim"
            type="submit"
            loading={loading}
            disabled={disabled}
          >
            {common_dictionary.recover_password}
          </Button>
        </div>

        <span className="pt-3 text-center text-sm">
          <span className="text-accent-7">{common_dictionary.have_account}</span>
          {` `}
          <a
            className="text-accent-9 cursor-pointer font-bold hover:underline"
            onClick={() => setModalView('LOGIN_VIEW')}
          >
            {common_dictionary.login}
          </a>
        </span>
      </div>
    </form>
  );
};

export default ForgotPassword;
