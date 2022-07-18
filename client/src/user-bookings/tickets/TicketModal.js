import React from 'react'
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { XIcon } from '@heroicons/react/outline';
import TicketComponent from './TicketComponent';

const TicketModal = ({isOpen, closeModal, booking}) => {
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
                  <div className='flex flex-row items-center justify-between mb-2'>
                    <h2>Your Tickets</h2>
                    <button
                                    onClick={closeModal}
                                    type="submit"
                                    className="
                                      text-gray-900
                                      bg-gray-100
                                      rounded-sm
                                      px-1
                                      py-1
                                      transition
                                      "
                                  >
                                    <XIcon className='w-4 h-4' />
                                  </button>
                  </div>
                </Dialog.Title>
                <div className="grid grid-cols-1">
                  <div className='flex flex-col gap-4'>
                  {booking.cart && booking.cart.map((ticket, index) => (
                    <TicketComponent booking={booking} ticket={ticket} />
                  ) )}
                  </div>
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

export default TicketModal