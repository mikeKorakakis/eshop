import { FC, memo } from 'react'
import rangeMap from '@/lib/range-map'
import cn, { clsx } from 'clsx'
import { StarIcon } from '@heroicons/react/24/outline'

export interface RatingProps {
  value: number
}

const Quantity: FC<RatingProps> = ({ value = 5 }) => (
  <div className="flex flex-row py-6 text-accent-9">
    {rangeMap(5, (i) => (
      <span
        key={`star_${i}`}
        className={cn('inline-block ml-1 ', {
          'text-slate-500': i >= Math.floor(value),
        })}
      >
        <StarIcon
          className={clsx(
            value > i ? 'text-red-500' : 'text-gray-300',
            'h-5 w-5 flex-shrink-0'
          )}
        />
         <p className="sr-only">{value} out of 5 stars</p>
      </span>
    ))}
  </div>
)

export default memo(Quantity)
