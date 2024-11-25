import clsx from 'clsx'
import React from 'react'

interface Props {
  tabs: {
    name: string
    current: boolean
    onClick: () => void,
}[],
className?: string
}

export default function Tab({ tabs, className}: Props) {
  return (
     <nav className={clsx("isolate flex divide-x divide-gray-200 rounded-lg shadow", className)} aria-label="Tabs">
      {tabs.map((tab, tabIdx) => (
        <div
          key={tab.name}
          onClick={tab.onClick}
          className={clsx(
            tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
            tabIdx === 0 ? 'rounded-l-lg' : '',
            tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
            'cursor-pointer group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
          )}
          aria-current={tab.current ? 'page' : undefined}
        >
          <span>{tab.name}</span>
          <span
            aria-hidden="true"
            className={clsx(
              tab.current ? 'bg-red-500' : 'bg-transparent',
              'absolute inset-x-0 bottom-0 h-0.5 '
            )}
          />
        </div>
      ))}
    </nav>
  )
}
