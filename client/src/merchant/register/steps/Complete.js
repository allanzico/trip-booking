import React from 'react'
import { CheckCircleIcon} from '@heroicons/react/outline'

const Complete = () => {
  return (

    <div class="relative flex min-h-screen flex-col items-center mt-16 overflow-hidden bg-white">
      <div class="max-w-xl px-5 text-center">
          
         <CheckCircleIcon className='mx-auto h-12 w-12 text-orange-500' />
        <h2 class="mb-2 text-[42px] font-bold text-orange-500">
        
          Successfully Sent!
        </h2>
        <p class="mb-2 text-lg text-zinc-500">
          We are glad to receive your request, our team will review the request
          and we will contact You within 10 working days
        </p>
      </div>
    </div>
  )
}

export default Complete