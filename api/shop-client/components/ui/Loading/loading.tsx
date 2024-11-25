import clsx from 'clsx'
import React from 'react'
import LoadingDots from '../LoadingDots'

interface Props {
  className?: string
}

export default function Loading({ className }: Props) {
  return (
    <div className={clsx("flex justify-center items-center", className ?  className : "h-[calc(100vh-16rem)] w-full" )}>
      <div className="">
        <LoadingDots />
      </div>
    </div>
  )
}
