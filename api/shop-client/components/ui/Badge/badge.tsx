import clsx from 'clsx'
import React from 'react'

interface Props {
  children?: string
  onClick?: () => void
  color?: 'indigo' | 'rose' | 'emerald' | 'sky'
}

export default function Badge({ children, onClick, color }: Props) {
  let colorBadge = 'bg-indigo-100 text-indigo-700'
  switch (color) {
    case 'indigo':
      colorBadge = 'bg-indigo-100 text-indigo-700'
      break
    case 'rose':
      colorBadge = 'bg-rose-100 text-rose-700'
      break
    case 'emerald':
      colorBadge = 'bg-emerald-100 text-emerald-700'
      break
    case 'sky':
      colorBadge = 'bg-sky-100 text-sky-700'
      break
  }

  let colorButton =
    'text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:bg-indigo-500'
  switch (color) {
    case 'indigo':
      colorButton =
        'text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:bg-indigo-500'
      break
    case 'rose':
      colorButton =
        'text-rose-400 hover:bg-rose-200 hover:text-rose-500 focus:bg-rose-500'
      break
    case 'emerald':
      colorButton =
        'text-emerald-400 hover:bg-emerald-200 hover:text-emerald-500 focus:bg-emerald-500'
      break
    case 'sky':
      colorButton =
        'text-sky-400 hover:bg-sky-200 hover:text-sky-500 focus:bg-sky-500'
      break
  }

  return children ? (
    <span
      className={clsx(
        "m-1 inline-flex items-center rounded-full border py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900",
        color ? colorBadge : 'bg-red-100 text-red-700'
      )}
    >
      {children}
      {onClick && (
        <button
          onClick={onClick}
          type="button"
          className={clsx(
            "ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500",

            color
              ? colorButton
              : 'text-red-400 hover:bg-red-200 hover:text-red-500 focus:bg-red-500'
          )}
        >
          <span className="sr-only">Remove option</span>
          <svg
            className="h-2 w-2"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 8 8"
          >
            <path
              strokeLinecap="round"
              strokeWidth="1.5"
              d="M1 1l6 6m0-6L1 7"
            />
          </svg>
        </button>
      )}
    </span>
  ) : null
}
