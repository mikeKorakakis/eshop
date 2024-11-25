import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import React, { Dispatch, Fragment, SetStateAction } from 'react'
import clsx from 'clsx'
import { PAGESIZE } from '@/lib/constants'
import { Dictionary } from '@/lib/get-dictionary'

interface Props {
  setTake?: Dispatch<SetStateAction<number>>
  setSkip: Dispatch<SetStateAction<number>>
  skip: number
  take?: number
  totalItems: number
  itemCount?: number
  showBorder?: boolean
  dictionary: Dictionary
}

export default function Pagination({
//   setTake,
  setSkip,
  skip,
  take,
  totalItems,
  itemCount,
  showBorder = true,
  dictionary
}: Props) {
//   const { t } = useTranslation(['profile', 'common'])
  const common_dictionary = dictionary.common;
  const totalPages = Math.ceil(totalItems / (take ?? PAGESIZE))
  const currentPage = Math.ceil(skip / (take ?? PAGESIZE)) + 1
  return (
    <div
      className={clsx(
        'flex items-center justify-between  bg-white px-4 py-3 sm:px-6',
        showBorder && 'border-t border-gray-200'
      )}
    >
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          disabled={currentPage === 1}
          type="button"
          onClick={() => setSkip((prev) => prev - (take ?? PAGESIZE))}
          className={clsx(
            'relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50',
            currentPage === 1 && 'opacity-50 cursor-not-allowed'
          )}
        >
          {common_dictionary.previous}
        </button>
        <button
          disabled={currentPage === totalPages}
          type="button"
          onClick={() => setSkip((prev) => prev + (take ?? PAGESIZE))}
          className={clsx(
            'relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50',
            currentPage === totalPages && 'opacity-50 cursor-not-allowed'
          )}
        >
          {common_dictionary.next}
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            {common_dictionary.showing_many}{' '}
            <span className="font-medium">{totalItems > 0 ? skip + 1 : 0}</span>{' '}
            {common_dictionary.to}{' '}
            <span className="font-medium">
              {skip + (take ?? PAGESIZE) > totalItems
                ? totalItems
                : skip + (itemCount ?? PAGESIZE)}
            </span>{' '}
            {common_dictionary.of} <span className="font-medium">{totalItems}</span>{' '}
            {common_dictionary.results}
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              disabled={currentPage === 1}
              type="button"
              onClick={() => setSkip((prev) => prev - (take ?? PAGESIZE))}
              className={clsx(
                'relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50',
                currentPage === 1 && 'opacity-50 cursor-not-allowed'
              )}
            >
              <span className="sr-only">{common_dictionary.previous}</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {/* Current: "z-pageSize bg-red-50 border-red-500 text-red-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            {Array.from({ length: totalPages }, (_, i) => {
              if (totalPages > 0 && totalPages < 10) {
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSkip(i * (take ?? PAGESIZE))}
                    aria-current="page"
                    className={clsx(
                      'relative z-pageSize inline-flex items-center border px-4 py-2 text-sm font-medium  ',
                      currentPage === i + 1
                        ? ' border-red-500 bg-red-50  text-red-600 z-20'
                        : ' border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                    )}
                  >
                    {i + 1}
                  </button>
                )
              } else if (totalPages === 10) {
                if (currentPage < 4 || currentPage > totalPages - 3) {
                    return (
                      <Fragment key={i}>
                        {(i === 0 || i === 1 || i === 2 || i === 3) && (
                          <button
                            type="button"
                            onClick={() => setSkip(i * (take ?? PAGESIZE))}
                            aria-current="page"
                            className={clsx(
                              'relative z-pageSize inline-flex items-center border px-4 py-2 text-sm font-medium  ',
                              currentPage === i + 1
                                ? ' border-red-500 bg-red-50  text-red-600 z-20'
                                : ' border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                            )}
                          >
                            {i + 1}
                          </button>
                        )}
                        {i === Math.ceil(totalPages / 2) && (
                          <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                            ...
                          </span>
                        )}
                        {(i === totalPages - 1 ||
                          i === totalPages - 2 ||
                          i === totalPages - 3 ||
                          i === totalPages - 4) && (
                          <button
                            type="button"
                            onClick={() => setSkip(i * (take ?? PAGESIZE))}
                            aria-current="page"
                            className={clsx(
                              'relative z-pageSize inline-flex items-center border px-4 py-2 text-sm font-medium  ',
                              currentPage === i + 1
                                ? ' border-red-500 bg-red-50  text-red-600 z-20'
                                : ' border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                            )}
                          >
                            {i + 1}
                          </button>
                        )}
                      </Fragment>
                    )
                  } else {
                    return (
                      <Fragment key={i}>
                        {(i === 0 ||
                          (i === 1 && i !== currentPage - 2) ||
                          (i === 2 && currentPage >= totalPages - 3)) && (
                          <button
                            type="button"
                            onClick={() => setSkip(i * (take ?? PAGESIZE))}
                            aria-current="page"
                            className={clsx(
                              'relative z-pageSize inline-flex items-center border px-4 py-2 text-sm font-medium ',
                              currentPage === i + 1
                                ? ' border-red-500 bg-red-50  text-red-600 z-20 '
                                : ' border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                            )}
                          >
                            {i + 1}
                          </button>
                        )}
                       
                        {i === 2 && !(i === currentPage - 1 || i===currentPage - 2 ) && (
                          <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                            ...
                          </span>
                        )}
                        {(i === currentPage ||
                          i === currentPage - 1 ||
                          i === currentPage - 2) && (
                          <button
                            type="button"
                            onClick={() => setSkip(i * (take ?? PAGESIZE))}
                            aria-current="page"
                            className={clsx(
                              'relative z-pageSize inline-flex items-center border px-4 py-2 text-sm font-medium  ',
                              currentPage === i + 1
                                ? ' border-red-500 bg-red-50  text-red-600 z-20'
                                : ' border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                            )}
                          >
                            {i + 1}
                          </button>
                        )}
                        {i === totalPages - 3 &&
                          i !== currentPage &&
                          currentPage >= 4 && (
                            <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                              ... {i === totalPages - 3} {i !== currentPage + 2}
                            </span>
                          )}
                        {i === totalPages - 4 &&
                          i !== currentPage &&
                          currentPage < 4 && (
                            <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                              ... {i === totalPages - 3} {i !== currentPage + 2}
                            </span>
                          )}
                        {(i === totalPages - 1 ||
                          i === totalPages - 2 ||
                          (i === totalPages - 3 && currentPage < 5)) && (
                          <button
                            type="button"
                            onClick={() => setSkip(i * (take ?? PAGESIZE))}
                            aria-current="page"
                            className={clsx(
                              'relative z-pageSize inline-flex items-center border px-4 py-2 text-sm font-medium  focus:z-20',
                              currentPage === i + 1
                                ? ' border-red-500 bg-red-50  text-red-600 '
                                : ' border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                            )}
                          >
                            {i + 1}
                          </button>
                        )}
                      </Fragment>
                    )
                  }
              } else if (totalPages > 10) {
                if (currentPage < 3 || currentPage > totalPages - 3) {
                  return (
                    <Fragment key={i}>
                      {(i === 0 || i === 1 || i === 2 || i === 3) && (
                        <button
                          type="button"
                          onClick={() => setSkip(i * (take ?? PAGESIZE))}
                          aria-current="page"
                          className={clsx(
                            'relative z-pageSize inline-flex items-center border px-4 py-2 text-sm font-medium  ',
                            currentPage === i + 1
                              ? ' border-red-500 bg-red-50  text-red-600 z-20'
                              : ' border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                          )}
                        >
                          {i + 1}
                        </button>
                      )}
                      {i === Math.ceil(totalPages / 2) && (
                        <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                          ...
                        </span>
                      )}
                      {(i === totalPages - 1 ||
                        i === totalPages - 2 ||
                        i === totalPages - 3 ||
                        i === totalPages - 4) && (
                        <button
                          type="button"
                          onClick={() => setSkip(i * (take ?? PAGESIZE))}
                          aria-current="page"
                          className={clsx(
                            'relative z-pageSize inline-flex items-center border px-4 py-2 text-sm font-medium  ',
                            currentPage === i + 1
                              ? ' border-red-500 bg-red-50  text-red-600 z-20'
                              : ' border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                          )}
                        >
                          {i + 1}
                        </button>
                      )}
                    </Fragment>
                  )
                } else {
                  return (
                    <Fragment key={i}>
                      {/* {i} */}
                      {(i === 0 ||
                        (i === 1 && i !== currentPage - 2) ||
                        (i === 2 && currentPage >= totalPages - 3)) && (
                        <button
                          type="button"
                          onClick={() => setSkip(i * (take ?? PAGESIZE))}
                          aria-current="page"
                          className={clsx(
                            'relative z-pageSize inline-flex items-center border px-4 py-2 text-sm font-medium ',
                            currentPage === i + 1
                              ? ' border-red-500 bg-red-50  text-red-600 z-20 '
                              : ' border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                          )}
                        >
                          {i + 1}
                        </button>
                      )}
                      {i === 2 && i !== currentPage - 1 && (
                        <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                          ...
                        </span>
                      )}
                      {(i === currentPage ||
                        i === currentPage - 1 ||
                        i === currentPage - 2) && (
                        <button
                          type="button"
                          onClick={() => setSkip(i * (take ?? PAGESIZE))}
                          aria-current="page"
                          className={clsx(
                            'relative z-pageSize inline-flex items-center border px-4 py-2 text-sm font-medium  ',
                            currentPage === i + 1
                              ? ' border-red-500 bg-red-50  text-red-600 z-20'
                              : ' border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                          )}
                        >
                          {i + 1}
                        </button>
                      )}
                      {i === totalPages - 3 &&
                        i !== currentPage &&
                        currentPage >= 4 && (
                          <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                            ... {i === totalPages - 3} {i !== currentPage + 2}
                          </span>
                        )}
                      {i === totalPages - 4 &&
                        i !== currentPage &&
                        currentPage < 4 && (
                          <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                            ... {i === totalPages - 3} {i !== currentPage + 2}
                          </span>
                        )}
                      {(i === totalPages - 1 ||
                        i === totalPages - 2 ||
                        (i === totalPages - 3 && currentPage < 4) ||
                        (i === totalPages - 4 && currentPage < 4)) && (
                        <button
                          type="button"
                          onClick={() => setSkip(i * (take ?? PAGESIZE))}
                          aria-current="page"
                          className={clsx(
                            'relative z-pageSize inline-flex items-center border px-4 py-2 text-sm font-medium  focus:z-20',
                            currentPage === i + 1
                              ? ' border-red-500 bg-red-50  text-red-600 '
                              : ' border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                          )}
                        >
                          {i + 1}
                        </button>
                      )}
                    </Fragment>
                  )
                }
              }
            })}

            <button
              disabled={currentPage === totalPages}
              type="button"
              onClick={() => setSkip((prev) => prev + (take ?? PAGESIZE))}
              className={clsx(
                'relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 ',
                currentPage === totalPages && 'opacity-50 cursor-not-allowed'
              )}
            >
              <span className="sr-only">{common_dictionary.next}</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}
