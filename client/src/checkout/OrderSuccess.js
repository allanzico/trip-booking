import {  ChevronDoubleRightIcon, } from '@heroicons/react/outline';
import { CheckCircleIcon,  } from '@heroicons/react/solid';
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

         <div class="relative flex flex-col justify-center py-5 bg-orange-500 py-5 text-gray-700 rounded-md leading-tight rounded-sm">
          <div className="max-w-xl py-3 px-3 text-center">
            <CheckCircleIcon className="absolute -left-5 top-5 h-12 w-12 rounded-full text-md text-orange-500 bg-white outline-white text-center" />
            <h2 className="mb-2 text-[32px] font-bold text-white">
        
      Thank You for your order!  let's have some fun!
        </h2>
        <p className="text-md text-white">
           An order confirmation has been sent to you email address
        </p>
         </div>
         <div className="px-5 py-3 flex flex-row gap-4 justify-between text-zinc-500">
        <span className='flex flex-col'>
          <p className='text-lg font-bold text-white'>UGX {totalPrice}</p>
          <p className='text-xs font-normal text-white'>total amount</p>
        </span>
        <span className='flex flex-col'>
        <p className='text-lg font-bold text-white'>{totalQuantity}</p>
          <p className='text-xs font-normal text-white'>total tickets</p>
        </span>
        <Link to="/dashboard#/user-experience-bookings" className="flex items-center text-white border border-white px-2 cursor-pointer">
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