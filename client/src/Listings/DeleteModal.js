import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSingleExperience } from "../actions/experience";
import { removeExperience } from "../Redux/reducers/experiences";
const DeleteModal = ({ closeModal, isOpen, exp }) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const dispatch = useDispatch();
  const deleteExperience = async () => {
    try {
      await deleteSingleExperience(exp._id, token);
      dispatch(removeExperience(exp._id));
    } catch (error) {}
  };
    const handleDelete = () => {
 deleteExperience();
        closeModal();
    }
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delete listing
                  </Dialog.Title>
                  <div className="grid grid-cols-1 mt-2">
                    Are You sure you would like to delete this listing? This
                    action can not be reversed
                  </div>
                  <div className="grid grid-cols-1 mt-3 ">
                    <div class="px-4 py-2 bg-gray-50 text-right sm:px-6">
                      <div className="flex items-center justify-end gap-2">
                        <div className="cursor-pointer">
                          <button
                            onClick={closeModal}
                            type="submit"
                            className="
                            text-white
                            bg-gray-400
                            rounded-sm
                            px-3
                            py-2
                            transition
                            hover:bg-gray-700
                            uppercase
                  "
                          >
                            Cancel
                          </button>
                        </div>
                        <div className="cursor-pointer">
                          <button
                          onClick={handleDelete}
                            type="submit"
                            className="
                            text-white
                            bg-red-600
                            rounded-sm
                            px-3
                            py-2
                            transition
                            hover:bg-red-900
                            uppercase
                          "
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DeleteModal;
