import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/outline";
import CreateTicketModal from "../../components/modals/CreateTicketModal";
import { currencyFormatter } from "../../actions/stripe";
import { v4 as uuidv4 } from 'uuid';
const CreateTicketForm = ({setTicketArray, ticketArray }) => {
  const [showModal, setShowModal] = useState(false);
  const [ticketData, setTicketData] = useState({
    ticketId: "" ,
    title: "",
    price: "",
    available:"",
    minTickets:"",
    maxTickets: ""
  });

  const handleTicketModal = (e) => {
    e.stopPropagation();
    setShowModal(!showModal);
  };
  return (
    <div className="flex flex-col">
      <div className="col-span-6">
        <hr />
        <h3 className="text-xs font-bold uppercase leading-8 text-gray-500">
          Add tickets
        </h3>
        <hr className="mb-3" />
        <div class="py-3 text-left">
          <button
            onClick={handleTicketModal}
            type="button"
            class="text-gray-900 bg-transparent border-1 border-orange-500 font-medium rounded-sm text-sm px-3 py-2.5 text-center inline-flex items-center mr-2 mb-2"
          >
            <PlusIcon className="w-4 h-4 mx-2" />
            Create New Ticket
          </button>
        </div>
        {showModal && (
          <CreateTicketModal
            showModal={showModal}
            setShowModal={setShowModal}
            ticketData={ticketData}
            setTicketData={setTicketData}
            ticketArray={ticketArray} 
            setTicketArray={setTicketArray}
          />
        )}
      </div>
      <div className="col-span-6">
        {ticketArray.length >=1  ? ticketArray.map((ticket) => (
          
          <div key={ticket.ticketId}  className="grid grid-cols-9 bg-white gap-2 flex py-7 px-2 pr-4 border-b hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t">
            <div className="col-span-4 ">
              <div className="flex flex-col items-start">
              <h5 className="text-lg font-semibold">{ticket.title}</h5>
                {/* <p className="text-xs py-2 text-gray-500">12/02/2022 - 12/02/2022</p> */}
              </div>
            </div>
            <div className="col-span-2 ">{ticket.available} tickets</div>
            <div className="col-span-2">
              <p className="text-md font-semibold text-orange-500">
              {currencyFormatter({
                amount: ticket.price * 100,
                currency: "ugx",
              })}
              </p>
            </div>
            <div className="col-span-1 ">
              <div className="flex flex-col items-end">Icon</div>
            </div>
          </div>
          
        )) : null }
        </div>
    </div>
  );
};

export default CreateTicketForm;
