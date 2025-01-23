'use client'
import Navigation from '@/components/home/Navigation/navigation';
import Footer from '@/components/common/Layout/footer';
import { Dictionary } from '@/lib/get-dictionary';
import Search from '@/components/home/Navigation/search';
import FeatureBar from './feature-bar';
import SidebarUI from './sidebar-ui';
import ModalUI from './modal-ui';
import MobileMenu from './mobile-menu';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/context/auth-context';
import Loading from '@/components/ui/Loading';

interface Props {
	children?: React.ReactNode;
	dictionary: Dictionary;
	lng: string
}

const Layout: React.FC<Props> =  ({ children, dictionary, lng }) => {
	const { isLoading } = useAuth();
	const pathname = usePathname();

	if (isLoading) {
		return <Loading/>
	}
	return (
		<div>
			<div>
				<MobileMenu dictionary={dictionary}  lng={lng}/>
				<div className="bg-gray-900">
					<Navigation
						dictionary={dictionary}
						search={<Search dictionary={dictionary} />}
						lng={lng}
					/>
				</div>
				<main className="relative ">
					<div className="mx-auto  ">
						<div className="overflow-hidden rounded-lg ">
							{/* <div className=" mt-1 h-24 " /> */}
							{pathname !== '/' && <div className=" mt-1 h-24 " />}
							{/* <TransitionLoader> */}
							{children}
							{/* </TransitionLoader> */}
						</div>
					</div>
				</main>
				<Footer dictionary={dictionary} />
				{/* <Footer pages={pageProps.pages} /> */}
				<ModalUI dictionary={dictionary} />
				{/* <CheckoutProvider> */}
				{/* SidebarUI */}
				<SidebarUI dictionary={dictionary} />
				{/* <SidebarUI links={navBarlinks} /> */}
				{/* </CheckoutProvider> */}
				{/* FeatureBar */}
				<FeatureBar dictionary={dictionary} />
			</div>
		</div>
	);
};

export default Layout;
