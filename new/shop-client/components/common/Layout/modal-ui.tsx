'use client';
import { LoginView, SignUpView } from '@/components/auth';
// import AddressForm from '@/components/profile/AddressesView/address-form';
import LoadingDots from '@/components/ui/LoadingDots';
import { MODAL_VIEWS, useUI } from '@/lib/context/ui-context';
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

const Modal = dynamic(() => import('@/components/ui/Modal'), {
	...dynamicProps,
	ssr: false
});

interface ModalProps {
	modalComponent: React.ReactNode;
	modalView: MODAL_VIEWS;
	closeModal(): any;
	dictionary: Dictionary;
}

const ModalView: React.FC<ModalProps> = ({ modalView, modalComponent, closeModal, dictionary }) => {
	return (
		<Modal onClose={closeModal}>
			{modalComponent}
			{modalView === 'LOGIN_VIEW' && <LoginView dictionary={dictionary} />}
			{modalView === 'SIGNUP_VIEW' && <SignUpView dictionary={dictionary} />}
			{/* {modalView === 'CREATE_UPDATE_ADDRESS_VIEW' && <AddressForm dictionary={dictionary} />} */}
		</Modal>
	);
};

interface ModalUIProps {
	dictionary: Dictionary;
}

const ModalUI: React.FC<ModalUIProps> = ({ dictionary }: ModalUIProps) => {
	const { closeModal, modalView, modalComponent } = useUI();
	return <ModalView modalView={modalView} modalComponent={modalComponent} closeModal={closeModal} dictionary={dictionary} />;
};

export default ModalUI;
