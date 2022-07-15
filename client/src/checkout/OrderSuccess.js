import { CheckCircleIcon, ChevronDoubleRightIcon } from '@heroicons/react/outline';
import React from 'react'
import ImageComponent from '../components/shared/ImageComponent';
import { Link } from 'react-router-dom';

const OrderSuccess = ({history}) => {
  const experience = history.location.state.experience;
  const cart = history.location.state.cart;
  const totalPrice = history.location.state.totalPrice;
  const totalQuantity = cart.reduce(
    (acc, item) => acc + item.ticketPrice,
    0
  );

  return (

<div className='container mt-3 md:mt-16 md:h-72 mx-auto flex flex-col-reverse md:flex-row gap-2'>
<div className="relative flex flex-col overflow-hidden bg-gray-50">
      <div className="max-w-xl py-3 px-3 text-center">
          
         <CheckCircleIcon className='mx-auto h-12 w-12' />
        <h2 className="mb-2 text-[32px] font-bold">
        
        <span className='text-orange-500'> Thank You! </span> let's have some fun!
        </h2>
        <p className="text-md text-zinc-500">
           An order confirmation has been sent to you email address
        </p>

      </div>
      <div className="px-5 py-3 flex flex-row gap-4 justify-between text-zinc-500">
        <span className='flex flex-col'>
          <p className='text-lg font-semibold text-gray-900'>UGX {totalPrice}</p>
          <p className='text-xs font-normal text-gray-400'>total amount</p>
        </span>
        <span className='flex flex-col'>
        <p className='text-lg font-semibold text-gray-900'>{totalQuantity}</p>
          <p className='text-xs font-normal text-gray-400'>total tickets</p>
        </span>
        <Link to="/dashboard#/user-experience-bookings" className="flex items-center text-orange-500 cursor-pointer">
                  <span className="font-bold ">View your orders</span>
                  <ChevronDoubleRightIcon className="h-4 w-4" />
                </Link>
        </div>

    </div>
    <div className=''>
      {experience && experience.files ? (<ImageComponent src={experience.files[0]?.url} />): null}
    </div>
</div>

  )
}

export default OrderSuccess