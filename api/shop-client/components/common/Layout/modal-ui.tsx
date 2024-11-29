'use client';
// import AddressForm from '@/components/profile/AddressesView/address-form';
import LoadingDots from '@/components/ui/LoadingDots';
import { MODAL_VIEWS, useUI } from '@/components/ui/context';
import { Dictionary } from '@/lib/get-dictionary';
import dynamic from 'next/dynamic';

const Loading = () => (
  <div className="flex h-80 w-80 items-center justify-center p-3 text-center">
    <LoadingDots />
  </div>
);

const dynamicProps = {
  loading: Loading
};

// const LoginView = dynamic(() => import('@/components/auth/login-view'), {
//   ...dynamicProps
// });

// const SignUpView = dynamic(() => import('@/components/auth/signup-view'), {
//   ...dynamicProps
// });

const ForgotPassword = dynamic(() => import('@/components/auth/forgot-password'), {
  ...dynamicProps
});

const DeleteAddressConfirmation = dynamic(
    () => import('@/components/profile/AddressesView/delete-address-confirmation'),
    {
        ...dynamicProps
    }
    );

// const FeatureBar = dynamic(() => import('@/components/common/FeatureBar'), {
//   ...dynamicProps
// });

const Modal = dynamic(() => import('@/components/ui/Modal'), {
  ...dynamicProps,
  ssr: false
});

interface ModalProps {
  modalView: MODAL_VIEWS;
  closeModal(): any;
  dictionary: Dictionary;
}

const ModalView: React.FC<ModalProps> = ({ modalView, closeModal, dictionary }) => {
  return (
    <Modal onClose={closeModal}>
      {/* {modalView === 'LOGIN_VIEW' && <LoginView dictionary={dictionary} />} */}
      {/* {modalView === 'SIGNUP_VIEW' && <SignUpView dictionary={dictionary} />} */}
      {modalView === 'FORGOT_VIEW' && <ForgotPassword dictionary={dictionary} />}
      {modalView === 'DELETE_ADDRESS_CONFIRMATION_VIEW' && <DeleteAddressConfirmation dictionary={dictionary} />}
      {/* {modalView === 'CREATE_UPDATE_ADDRESS_VIEW' && <AddressForm dictionary={dictionary} />} */}
    </Modal>
  );
};

interface ModalUIProps {
  dictionary: Dictionary;
}

const ModalUI: React.FC<ModalUIProps> = ({ dictionary }: ModalUIProps) => {
  const { closeModal, modalView } = useUI();
  return <ModalView modalView={modalView} closeModal={closeModal} dictionary={dictionary} />;
};

export default ModalUI;
