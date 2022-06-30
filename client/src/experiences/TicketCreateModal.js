import React, { useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import CustomTextField from '../components/CustomMUI/CustomTextField'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const TicketCreateModal = ({closeModal,ticketArray, openModal, handleTicket, isOpen}) => {

    const ticketDataValidationSchema = Yup.object().shape({
      ticketTitle: Yup.string().required("title is required"),
      test: Yup.string().required("test is required"),
      price: Yup.number().required("price is required"),
      minAvailable: Yup.number().required("min available is required"),
      maxAvailable: Yup.number().required("max available is required"),
    });
  

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
                      Add ticket data
                    </Dialog.Title>
                    <div className="grid grid-cols-1">
        <Formik
          initialValues={ticketArray}
          validationSchema={ticketDataValidationSchema}
          onSubmit={handleTicket}
        >
          {({ values }) => (
            <Form>
              <div className="flex flex-col mt-2">
                <div className="grid grid-cols-1 space-y-2">
                <div className="col-span-6">
                  <CustomTextField name="ticketTitle" label="title" size="small" />
                  <CustomTextField name="test" label="test" size="small" />
                </div>
                <div className="col-span-6">
                  <CustomTextField type="number" name="ticketPrice" label="price" size="small" />
                </div>
                <div className="col-span-6">
                  <div className="flex flex-col md:flex-row gap-2">
                    <CustomTextField
                      type="number"
                      name="minAvailable"
                      label="min tickets"
                      size="small"
                    />
                    <CustomTextField
                      type="number"
                      name="maxAvailable"
                      label="max tickets"
                      size="small"
                    />
                  </div>
                </div>
                </div>

                <div className="grid grid-cols-1 mt-3 ">
                  <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
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
                            hover:bg-gray-600
                            uppercase
                  "
                        >
                          Cancel
                        </button>
                      </div>
                      <div className="cursor-pointer">
                      <button
                      onClick={() => handleTicket(values)}
                          type="submit"
                          className="
                            text-white
                            bg-orange-500
                            rounded-sm
                            px-3
                            py-2
                            transition
                            hover:bg-orange-700
                            uppercase
                          "
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    )
}

export default TicketCreateModal