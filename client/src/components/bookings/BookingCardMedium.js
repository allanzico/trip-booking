import React, { useEffect } from "react";
import ImageComponent from "../shared/ImageComponent";
import { Link, useHistory } from "react-router-dom";

import moment from "moment";

const BookingCardMedium = ({ experience,bookingId }) => {
  const history = useHistory();
  const img =
    experience.image && experience.image.contentType
      ? `${process.env.REACT_APP_API}/experience/image/${experience._id}`
      : "https://via.placeholder.com/900x500.png?text=PREVIEW";

  return (
    <>
     <div
     onClick={() => history.push(`/booking/${bookingId}`)}
      className="cursor-pointer hover:scale-105 transform transition duration-300 ease-out"
    >
     
        <div className="relative h-42 w-42 flex-shrink-0">
        <ImageComponent src={img} alt="image" />
      </div>
      <div className="my-2">
        <h2 className="truncate ...">{experience.location}</h2>
        <h3 className="text-gray-500 text-md">
          {moment(new Date(experience.startDate)).format("DD MMMM YY")} -{" "}
          {moment(new Date(experience.endDate)).format("DD MMMM YY")}
        </h3>
        <h3 className="text-gray-500">Your Host: {experience.postedBy.name}</h3>
      </div>

    </div>
    
    </>

    
  );
};

export default BookingCardMedium;
