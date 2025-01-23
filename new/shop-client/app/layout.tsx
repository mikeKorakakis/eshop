import { Metadata } from 'next';
// import localFont from 'next/font/local';
// import { LOCALES } from '@/lib/constants';
import clsx from 'clsx';
import './globals.css';
import { Inter } from 'next/font/google'
import { ManagedCartContext } from '@/lib/context/cart-context';
import { ManagedUIContext } from '@/lib/context/ui-context';

// const myFont = localFont({
//   src: [
//     {
//         path: '../fonts/PFBagueSansPro.woff2',
//         weight: '400',
//         style: 'normal'
//         },
//         {
//         path: '../fonts/PFBagueSansPro-Light.woff2',
//         weight: '400',
//         style: 'italic'
//         },
//         {
//         path: '../fonts/PFBagueSansPro-Bold.woff2',
//         weight: '700',
//         style: 'normal'
//         }
//   ]
// });

const inter = Inter({ subsets: ['latin'] })

const { SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL
	? `https://${process.env.NEXT_PUBLIC_FRONTEND_URL}`
	: 'http://localhost:8000';

export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),
	title: {
		default: SITE_NAME!,
		template: `%s | ${SITE_NAME}`
	},
	robots: {
		follow: true,
		index: true,

	},
};


export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={clsx(inter.className, "h-full")} >
			<head>
				<meta key="viewport" name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="manifest" href="/site.webmanifest" key="site-manifest" />
			</head>
			<body className='h-full'>
						{children}
			</body>
		</html>
	);
}
