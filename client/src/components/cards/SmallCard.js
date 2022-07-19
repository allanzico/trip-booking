import React from 'react'
import ImageComponent from '../shared/ImageComponent'
import { diffDays } from "../../actions/experience";


const SmallCard = ({exp,img}) => {
  
  return (
    <div className='flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out'>
        <div className='relative h-16 w-16 flex-shrink-0'><ImageComponent src={img} alt="img"/></div>
        <div>
            <h2>{exp.location}</h2>
            <h3 className='text-gray-500'>
            {diffDays(new Date(), exp.startDate)}{" "}
            {diffDays(new Date(), exp.startDate) == 1 ? " day" : " days"} left
            </h3>
        </div>
    </div>
  )
}

export default SmallCard