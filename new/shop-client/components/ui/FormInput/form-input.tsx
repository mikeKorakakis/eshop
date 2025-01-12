import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import React, { forwardRef, InputHTMLAttributes } from 'react';

type Props = {
  label?: string;
  name: string;
  error?: string;
  loading?: boolean;
  disabled?: boolean;
  filePreview?: boolean; // Optional prop for file preview
};

const FormInput = forwardRef<HTMLInputElement, Props & InputHTMLAttributes<HTMLInputElement>>(
  ({ label, name, error, className, disabled, loading, filePreview, ...rest }, ref) => {
    const [show, setShow] = React.useState(false);
    const [fileName, setFileName] = React.useState<string | null>(null); // To handle file name display

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
		// @ts-ignore
        setFileName(event.target.files[0].name);
      }
    };

    return (
      <>
        <div className="w-full">
          {label && (
            <label
              className={clsx(
                'mb-2 block text-sm font-medium text-gray-700',
                error && 'text-red-500'
              )}
            >
              {label}
            </label>
          )}
          {rest?.type === 'password' ? (
            <div className="relative">
              <input
                id={name}
                autoComplete={name}
                name={name}
                {...rest}
                ref={ref}
                type={rest?.type === 'password' ? (show ? 'text' : 'password') : rest?.type}
                disabled={disabled}
                className={clsx(
                  'block w-full rounded-md border border-zinc-200 bg-white p-2 font-normal shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 sm:text-sm',
                  error && 'ring-2 ring-red-500',
                  disabled &&
                    'disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500',
                  className
                )}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {show ? (
                  <EyeIcon
                    onClick={() => setShow(false)}
                    className="h-5 w-5 cursor-pointer text-gray-400"
                    aria-hidden="true"
                  />
                ) : (
                  <EyeSlashIcon
                    onClick={() => setShow(true)}
                    className="h-5 w-5 cursor-pointer text-gray-400"
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>
          ) : rest?.type === 'file' ? (
            <div className="relative">
              <input
                id={name}
                name={name}
                {...rest}
                ref={ref}
                type="file"
                disabled={disabled}
                onChange={(e) => {
                  handleFileChange(e);
                  rest?.onChange?.(e); // Call the provided onChange prop if available
                }}
                className={clsx(
                  'block w-full rounded-md border border-zinc-200 bg-white p-2 font-normal shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 sm:text-sm',
                  error && 'ring-2 ring-red-500',
                  disabled &&
                    'disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500',
                  className
                )}
              />
              {filePreview && fileName && (
                <p className="mt-2 text-sm text-gray-500">
                  Selected file: <span className="font-medium">{fileName}</span>
                </p>
              )}
            </div>
          ) : (
            <input
              id={name}
              autoComplete={name}
              name={name}
              {...rest}
              ref={ref}
              disabled={disabled}
              className={clsx(
                'block w-full rounded-md border border-zinc-200 bg-white p-2 font-normal shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 sm:text-sm',
                error && 'ring-2 ring-red-500',
                disabled &&
                  'disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500',
                className
              )}
            />
          )}
        </div>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;