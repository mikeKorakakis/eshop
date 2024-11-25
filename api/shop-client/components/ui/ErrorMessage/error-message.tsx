import type { FC } from 'react'
import cn from 'clsx'

interface ErrorMessageProps {
  error: {
    message: string
    code?: string
    errors?: {
      message: string
    }[]
  }
  className?: string
}

const ErrorMessage: FC<ErrorMessageProps> = ({ error, className }) => {
  return (
    <div
      className={cn(
        'flex flex-col text-error py-2.5 px-4 border border-solid border-error rounded-md',
        className
      )}
    >
      <span>{error.message}</span>
      {error.errors && error.errors?.length > 0 && (
        <ul className="list-disc list-inside">
          {error.errors.map(({ message }, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ErrorMessage
