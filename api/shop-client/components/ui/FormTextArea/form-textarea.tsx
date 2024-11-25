import clsx from 'clsx'
import React, { forwardRef, InputHTMLAttributes } from 'react'

interface Props {
  label?: string
  name: string
  error?: string
  loading?: boolean
  disabled?: boolean
  rows?: number
}

const FormTextArea = forwardRef<
HTMLTextAreaElement,
  Props & InputHTMLAttributes<HTMLTextAreaElement>
>(({ label, name, error, className, disabled, loading, ...rest }, ref) => {
  return (
    <>
      <div className="w-full ">
        {label && (
          <label
            className={clsx(
              'block text-sm font-medium text-gray-700 mb-2',
              error && 'text-error'
            )}
          >
            {label}
          </label>
        )}
        <textarea
          id={name}
          autoComplete={name}
          name={name}
          {...rest}
          ref={ref}
          disabled={disabled}
          className={clsx(
            'bg-white p-2 border block border-zinc-200 w-full sm:text-sm font-normal shadow-sm rounded-md focus:border-red-500 focus:ring-red-500 focus:outline-none focus:ring-1',
            error && 'ring-2 ring-error',
            disabled &&
              'disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500',
            className
          )}
        />
      </div>
      {error && <p className="mt-2 text-sm text-error">{error}</p>}
    </>
  )
})

FormTextArea.displayName = 'FormTextArea'

export default FormTextArea
