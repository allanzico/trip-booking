import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomTextField from "../../../components/CustomMUI/CustomTextField";
import CustomDatePicker from "../../../components/CustomMUI/CustomDatePicker";
import GooglePlacesSearch from "../../../components/GooglePlacesSearch";
import TicketCard from "../../TicketCard";
import { PlusIcon } from "@heroicons/react/outline";
import TicketCreateModal from "../../TicketCreateModal";

const TicketData = (props) => {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  const { ticketArray, setTicketArray } = props

  const handleSubmit = (values) => {

    props.next(values, true);
  };

  const handleTicket = (values) => {
    console.log(values)
  }

  return (
    <>
      <div className="container mb-2 flex flex-col text-center">
        <h1 className="lg:text-4xl text-2xl">Create Tickets</h1>
      </div>

      <div className="grid grid-cols-1">
        <Formik
          initialValues={props.data}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form>
              <div className="flex flex-col">
                <div className="grid grid-cols-1 space-y-2">
                  <div className="col-span-6 mb-2">
                    <div class="py-3 text-left">
                      <button
                       onClick={openModal}
                        type="button"
                        class="text-gray-900 bg-transparent border-1 border-orange-500 font-medium rounded-sm text-sm px-3 py-2.5 text-center inline-flex items-center mr-2 mb-2"
                      >
                        <PlusIcon className="w-4 h-4 mx-2" />
                        Create New Ticket
                      </button>
                    </div>
                  </div>
                  {/* Location input */}
                  <div className="col-span-6">
                   <TicketCreateModal handleTicket={handleTicket} ticketArray={ticketArray} setTicketArray={setTicketArray} isOpen={isOpen} closeModal={closeModal} openModal={openModal} />               
                  </div>
                </div>
                <div className="grid grid-cols-1 ">
                  <TicketCard ticketArray={ticketArray} />
                </div>
                <div className="grid grid-cols-1 mt-3 ">
                  <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <div className="flex items-center justify-end gap-2">
                      <div className="cursor-pointer">
                        <button
                          onClick={() => props.prev(values)}
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
                          Back
                        </button>
                      </div>
                      <div className="cursor-pointer">
                        <button
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
    </>
  );
};

export default TicketData;
