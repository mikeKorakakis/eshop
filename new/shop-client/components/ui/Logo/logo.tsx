import zen1oneLogo from '@/assets/images/logo.png'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

const Logo = ({ className = '', ...props }) => (
	<Link href="/" className='focus-visible:outline-0  '>
		<span className="sr-only">UNIWA SHOP</span>
		<span className={twMerge(clsx("text-3xl font-bold text-black outline-1 outline-white", className))}>UNIWA</span>
		<span className={twMerge(clsx("text-3xl  text-black outline-1 outline-white", className))}>SHOP</span>
		{/* <Image
    //   sizes={'12rem'}
      width={128}
      className={twMerge(clsx(
        // 'w-36 hover:scale-110 transition ease-in-out delay-150',
        'focus-visible:outline-0  w-32',
        className
      ))}
      src={zen1oneLogo}
      alt=""
      {...props}
    /> */}
	</Link>
)

export default Logo
