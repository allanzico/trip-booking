import React from "react";
import ImageComponent from "../shared/ImageComponent";

const MediumCard = ({ exp, img }) => {
  return (
    <div className="cursor-pointer hover:scale-105 transform transition duration-300 ease-out">
      <div className="relative h-80 w-80 flex-shrink-0">
        <ImageComponent src={img} alt="image" />
      </div>
      <h3 className="text-2xl mt-3">{exp.location}</h3>
    </div>
  );
};

export default MediumCard;
