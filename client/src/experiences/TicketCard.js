import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { currencyFormatter } from "../actions/stripe";
import TicketEditModal from "./TicketEditModal";

const TicketCard = ({ ticket, data, setData, handleDelete}) => {
  let [isOpen, setIsOpen] = useState(false);
  const [ticketEdit, setTicketEdit] = useState({})

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const setEditValues = (values) => { 
    setTicketEdit(values);
     openModal()
   }

  return (
    <>
    <div className="col-span-6">
    <TicketEditModal setEditValues={setEditValues} setData={setData} data={data} ticketEdit={ticketEdit} isOpen={isOpen} openModal={openModal} closeModal={closeModal}/>
  </div>
    <div className="col-span-6">
      <div
        className="grid grid-cols-9 bg-white gap-2 flex py-7 px-2 pr-4 border-b hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t"
      >
        <div className="col-span-4 ">
          <div className="flex flex-col items-start">
            <h5 className="text-lg font-semibold">{ticket.ticketTitle}</h5>
            {/* <p className="text-xs py-2 text-gray-500">12/02/2022 - 12/02/2022</p> */}
          </div>
        </div>
        <div className="col-span-2 ">{ticket.ticketAvailable} tickets</div>
        <div className="col-span-2">
          <p className="text-md font-semibold text-orange-500">
            {currencyFormatter({
              amount: ticket.ticketPrice * 100,
              currency: "ugx",
            })}
          </p>
        </div>
        <div className="col-span-1 ">
          <div className="flex flex-col items-center space-y-3">
            <div onClick={() => setEditValues(ticket)} className="cursor-pointer">
              <PencilAltIcon className="h-4 w-4" />
            </div>
            <div onClick={(e) => handleDelete(e, ticket._id)} className="cursor-pointer">
              <TrashIcon className="h-4 w-4"  />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default TicketCard;
