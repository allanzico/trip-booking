import { TicketIcon } from '@heroicons/react/outline'
import React from 'react'

const NoTickets = () => {
  return (
    <div class="relative flex min-h-screen flex-col justify-center items-center overflow-hidden bg-white">
    <div class="max-w-xl px-5 text-center">
        
       <TicketIcon className='mx-auto h-24 w-24 text-gray-400' />
      <p class="mb-2 text-lg text-gray-400">
            No tickets yet! checkout and book some great experiences 
      </p>
    </div>
  </div>
  )
}

export default NoTickets