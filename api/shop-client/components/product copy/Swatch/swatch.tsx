import { clsx } from 'clsx'
import React from 'react'
import { Check } from '@/components/icons'
import type { ButtonProps }  from '@/components/ui/Button'
// import { isDark } from '@lib/colors'
interface SwatchProps {
  active?: boolean
  children?: any
  className?: string
  variant?: 'size' | 'color' | string
  color?: string
  label?: string | null
}

const Swatch: React.FC<Omit<ButtonProps, 'variant'> & SwatchProps> = ({
  active,
  className,
  color = '',
  label = null,
  variant = 'size',
  ...props
}) => {
  variant = variant?.toLowerCase()

  if (label) {
    label = label?.toLowerCase()
  }

//   const swatchClassName = cn(
//     s.swatch,
//     {
//       [s.color]: color,
//       [s.active]: active,
//       [s.size]: variant === 'size',
//     //   [s.dark]: color ? isDark(color) : false,
//       [s.textLabel]: !color && label && label.length > 3,
//     },
//     className
//   )
  return (
    <button
      role="option"
      type="button"
      aria-selected={active}
      aria-label={variant && label ? `${variant} ${label}` : 'Variant Swatch'}
      //   className={swatchClassName}
      className={clsx(
        'cursor-pointer focus:outline-none grow-0',
        active ? 'ring-2 ring-offset-2 ring-red-500' : '',
        active
          ? 'bg-red-600 border-transparent text-white hover:bg-red-700'
          : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
        'border rounded-md py-3 px-3 text-sm font-medium uppercase '
      )}
      {...(label && color && { title: label })}
      style={color ? { backgroundColor: color } : {}}
      {...props}
    >
      {color && active && (
        <span>
          <Check />
        </span>
      )}
      {!color ? label : null}
    </button>
  )
}

export default React.memo(Swatch)
