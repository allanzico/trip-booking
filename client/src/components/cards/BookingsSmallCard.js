import React from 'react'
import ImageComponent from '../shared/ImageComponent'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
const BookingsSmallCard = ({experience}) => {
    const img = experience.image && experience.image.contentType ? `${process.env.REACT_APP_API}/experience/image/${experience._id}` : "https://via.placeholder.com/900x500.png?text=PREVIEW"
  const history = useHistory()
    return (
    <div  onClick={() => history.push(`/booking/${experience._id}`) } className='flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out'>
    <div className='relative h-16 w-16 flex-shrink-0'><ImageComponent src={img} alt="img"/></div>
    <div>
        <h2 className='truncate ...'>{experience.location}</h2>
        <h3 className='text-gray-500'>
        {moment(new Date(experience.startDate)).format("DD MMMM YY")} -   {moment(new Date(experience.endDate)).format("DD MMMM YY")}
        </h3>
        <h3 className='text-gray-500'>
            Your Host: {experience.postedBy}
        </h3>
    </div>
</div>
  )
}

export default BookingsSmallCard