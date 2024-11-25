import Navigation from '@/components/home/Navigation/navigation';
import Footer from '@/components/common/Layout/footer';
import { Dictionary } from '@/lib/get-dictionary';
// import TransitionLoader from '../TransitionLoader/TransitionLoader'
import Search from '@/components/home/Navigation/search';
import FeatureBar from './feature-bar';
import SidebarUI from './sidebar-ui';
import ModalUI from './modal-ui';
import MobileMenu from './mobile-menu';
import NavigationClient from '@/components/home/Navigation/navigation-client';
import { getActiveOrderQuery } from '@/lib/vendure/shop/orders/order';

interface Props {
  children?: React.ReactNode;
  dictionary: Dictionary;
  pathname: string;
}

const Layout: React.FC<Props> = async ({ children, dictionary, pathname }) => {
  // const navBarlinks = categories.slice(0, 2).map((c) => ({
  //     label: c.name,
  //     href: `/search/${c.slug}`,
  // }))
 const order = await getActiveOrderQuery()
  return (
    <div>
      <div>
        {/* <Navbar links={navBarlinks} /> */}
        {/* MobileMenu */}
        <MobileMenu dictionary={dictionary} />
        <div className="bg-gray-900">
          <Navigation
            pathName={pathname}
            dictionary={dictionary}
            search={<Search dictionary={dictionary} />}
            navigationClient={<NavigationClient dictionary={dictionary} />}
            order={order}
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
        <SidebarUI dictionary={dictionary} order={order} />
        {/* <SidebarUI links={navBarlinks} /> */}
        {/* </CheckoutProvider> */}
        {/* FeatureBar */}
        <FeatureBar dictionary={dictionary} />
      </div>
    </div>
  );
};

export default Layout;
