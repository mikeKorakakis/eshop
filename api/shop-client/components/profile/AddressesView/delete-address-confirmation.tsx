import { useUI } from '@/components/ui/ui-context';
import { Dictionary } from '@/lib/get-dictionary';
import { Dialog } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

type Props = {
  dictionary: Dictionary;
};

export default function DeleteAddressConfirmation({ dictionary }: Props) {
  const { closeModal, payload } = useUI();
  const common_dictionary = dictionary.common;
  const profile_dictionary = dictionary.profile;


  return (
    <>
      <div className="sm:flex sm:items-start -mx-3">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
            {profile_dictionary.delete_address}
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              {profile_dictionary.delete_address_confirmation}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:ml-10 sm:mt-4 sm:flex sm:pl-4">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto"
          onClick={payload}
        >
          {common_dictionary.delete}
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:mt-0 sm:w-auto"
          onClick={closeModal}
          //   ref={cancelButtonRef}
        >
          {common_dictionary.cancel}
        </button>
      </div>
    </>
  );
}
