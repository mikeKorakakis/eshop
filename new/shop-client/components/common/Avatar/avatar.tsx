'use client'
import { FC, useRef } from 'react'
// import { useUserAvatar } from '@lib/hooks/useUserAvatar'
import { UserIcon } from '@heroicons/react/24/outline'
import {usePathname} from 'next/navigation'
import clsx from 'clsx'
import { i18n } from '@/i18n-config'

interface Props {
  className?: string
  children?: any
}

const Avatar: FC<Props> = ({className}) => {
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>
  const pathname = usePathname()
  const locales = i18n.locales.map((locale) => locale) as string[];
  const isRoot = pathname === '/' || locales.some(loc => pathname === "/" + loc);
  //   let { userAvatar } = useUserAvatar()

  return (
    <div
      ref={ref}
      //   style={{ backgroundImage: userAvatar }}
      className={clsx("inline-block h-7 w-7 rounded-full border-2 hover:scale-105 ",isRoot? "border-white": "border-black", className)} 
    >
      <UserIcon className={clsx("w-full p-1 hover:scale-105", isRoot? "text-white": "text-black")} />
      {/* Add an image - We're generating a gradient as placeholder  <img></img> */}
    </div>
  )
}

export default Avatar
