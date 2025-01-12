'use client';
import LoadingDots from '@/components/ui/LoadingDots';
import Sidebar from '@/components/ui/Sidebar';
import { useUI } from '@/components/ui/ui-context';
import { Dictionary } from '@/lib/get-dictionary';
// import { Order } from '@/lib/vendure/generated/graphql-shop';
import dynamic from 'next/dynamic';

const Loading = () => (
  <div className="flex h-80 w-80 items-center justify-center p-3 text-center">
    <LoadingDots />
  </div>
);

const dynamicProps = {
  loading: Loading
};

const CartSidebarView = dynamic(() => import('@/components/cart/CartSidebarView'), {
  ...dynamicProps
});

interface SidebarViewProps {
  sidebarView: string;
  closeSidebar(): any;
  dictionary: Dictionary;
}

const SidebarView: React.FC<SidebarViewProps> = ({
  sidebarView,
  closeSidebar,
  dictionary,

  //   locale,
  //  links
}) => {
  return (
    <Sidebar onClose={closeSidebar}>
      {sidebarView === 'CART_VIEW' && <CartSidebarView dictionary={dictionary} />}
      {/* {sidebarView === 'SHIPPING_VIEW' && <ShippingView />} */}
      {/* {sidebarView === 'PAYMENT_VIEW' && <PaymentMethodView />} */}
      {/* {sidebarView === 'CHECKOUT_VIEW' && <CheckoutSidebarView />} */}
      {/* {sidebarView === 'MOBILE_MENU_VIEW' && <MenuSidebarView links={links} />} */}
    </Sidebar>
  );
};

interface SidebarUIProps {
  dictionary: Dictionary;
}

const SidebarUI: React.FC<SidebarUIProps> = ({ dictionary }) => {
  // const SidebarUI: React.FC<{ links: LinkProps[] }> = ({ links }) => {
  const { closeSidebar, sidebarView } = useUI();
  return (
    <SidebarView
      sidebarView={sidebarView}
      closeSidebar={closeSidebar}
      dictionary={dictionary}
    />
  );
};

export default SidebarUI;
