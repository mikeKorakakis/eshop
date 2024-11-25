import clsx from 'clsx';
import React, { forwardRef, InputHTMLAttributes } from 'react';
import { Dictionary } from '@/lib/get-dictionary';

interface Options {
  label: string;
  value: string | number;
}
interface Props {
  label?: string;
  error?: string;
  name: string;
  disabled?: boolean;
  options?: Options[];
  dictionary: Dictionary;
}

const FormSelect = forwardRef<HTMLSelectElement, Props & InputHTMLAttributes<HTMLSelectElement>>(
  ({ label, error, name, disabled, options, className, dictionary, ...rest }, ref) => {
    const opts: Options[] = options ? [...options] : [];
    const common_dictionary = dictionary.common;

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

          <select
            id={name}
            name={name}
            disabled={disabled}
            autoComplete={name}
            ref={ref}
            {...rest}
            className={clsx(
              'block w-full rounded-md border border-zinc-200 p-2 font-normal shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 sm:text-sm',
              error && 'ring-2 ring-red-500',
              disabled &&
                'disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500',
              className
            )}
          >
            <option value=""></option>
            {opts.map(({ label, value }) => {
              return (
                <option
                  key={value}
                  value={value}
                  // selected={
                  // 	selectedValue
                  // 		? parseInt(value) ===
                  // 		  parseInt(selectedValue.toString())
                  // 		: false
                  // }
                >
                  {/*  @ts-ignore */}
                  {common_dictionary[label]}
                </option>
              );
            })}
          </select>
        </div>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </>
    );
  }
);

FormSelect.displayName = 'FormSelect';

export default FormSelect;
