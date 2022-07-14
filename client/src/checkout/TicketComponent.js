import { MinusIcon, PlusIcon } from "@heroicons/react/outline";
import React, { useState } from "react";

const TicketComponent = ({ ticket }) => {
  const [quantity, setQuantity] = useState(0);

  const handleDecreament = (ticketId) => {
    if (quantity > 0) {
      ticket._id === ticketId && setQuantity(quantity - 1);
    }
  };

  const handleIncrement = (ticketId) => {
    ticket._id === ticketId && setQuantity(quantity + 1);
  };

  return (
    <div class="flow-root">
      <li class="flex items-center justify-between py-4">
        <div class="flex items-start">
          {/* <img
            class="flex-shrink-0 object-cover w-16 h-16 rounded-lg"
            src="https://images.unsplash.com/photo-1588099768531-a72d4a198538?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y2xvdGhpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
            alt=""
          /> */}

          <div class="ml-4">
            <p class="text-sm uppercase font-medium">{ticket.ticketTitle}</p>

            <dl class="mt-1 space-y-1 text-sm font-bold text-gray-900">
              <p>UGX {ticket.ticketPrice}</p>
            </dl>
          </div>
        </div>

        <div>
          <p class="text-sm">
            <p className="text-xs mb-1">QTY</p>
            <div className="flex flex-row justify-between items-center gap-4">
              <button
                onClick={() => handleDecreament(ticket._id)}
                className="border content-center text-center w-10 px-2 py-2 border-gray-800 rounded-sm"
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <lable>{quantity}</lable>
              <button
                onClick={() => handleIncrement(ticket._id)}
                className="border content-center text-center w-10 px-2 py-2 border-gray-800 rounded-sm"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
          </p>
        </div>
      </li>
    </div>
  );
};

export default TicketComponent;
