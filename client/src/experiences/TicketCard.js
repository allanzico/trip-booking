import React from 'react'
import { currencyFormatter } from '../actions/stripe'

const TicketCard = ({ticketArray}) => {
  return (
    <div className="col-span-6">
    {ticketArray.length >= 1
      ? ticketArray.map((ticket) => (
          <div
            key={ticket.ticketId}
            className="grid grid-cols-9 bg-white gap-2 flex py-7 px-2 pr-4 border-b hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t"
          >
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
              <div className="flex flex-col items-end">
                <div className="col-span-1 cursor-pointer flex flex-row items-center pl-12 mr-2">
                  Icon
                </div>
              </div>
            </div>
          </div>
        ))
      : null}
  </div>
  )
}

export default TicketCard