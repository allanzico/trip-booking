import { ArchiveIcon } from '@heroicons/react/outline'
import React from 'react'

const NoBookings = () => {
  return (
    <div class="relative flex min-h-screen flex-col justify-center items-center overflow-hidden bg-white">
    <div class="max-w-xl px-5 text-center"> 
       <ArchiveIcon className='mx-auto h-24 w-24 text-gray-400' />
      <p class="mb-2 text-lg text-gray-400">
            No bookings yet! checkout and book some great experiences 
      </p>
    </div>
  </div>
  )
}

export default NoBookings