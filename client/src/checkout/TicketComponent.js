import React from 'react'
import ListboxComponent from './ListboxComponent'

const TicketComponent = ({ticket}) => {
  return (
    <div class="flow-root">
      <li class="flex items-center justify-between py-4">
        <div class="flex items-start">
          <img
            class="flex-shrink-0 object-cover w-16 h-16 rounded-lg"
            src="https://images.unsplash.com/photo-1588099768531-a72d4a198538?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y2xvdGhpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
            alt=""
          />

          <div class="ml-4">
            <p class="text-sm uppercase font-medium">{ticket.ticketTitle}</p>

            <dl class="mt-1 space-y-1 text-sm font-bold text-gray-900">
            <p>UGX {ticket.ticketPrice}</p>
            </dl>
          </div>
        </div>

        <div>
          <p class="text-sm">
            <p className='text-xs mb-1'>QTY</p>
          <div className='flex flex-row justify-between items-center gap-4'>
            <button className='border w-16 px-2 py-2 border-gray-800 rounded-sm'>
                minus
            </button>
            <lable>
                0
            </lable>
            <button className='border w-16 px-2 py-2 border-gray-800 rounded-sm'>
                plus
            </button>
          </div>
          </p>
        </div>
      </li>
  </div>
  )
}

export default TicketComponent