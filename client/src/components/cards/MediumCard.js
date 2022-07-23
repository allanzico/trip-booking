import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ImageComponent from "../shared/ImageComponent";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const MediumCard = ({ exp, img }) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const user = auth === undefined ? null : auth?.user;
  const history = useHistory();
  const source = axios.CancelToken.source();
  const [favorites, setFavorites] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (auth == null) return;
    if (exp.postedBy?._id === user?._id) {
      setIsOwner(true);
    }
    return () => {
      source.cancel();
    };
  }, []);

  const handleNavigate = (e) => {
    e.preventDefault();
    history.push({ pathname: `/experience/${exp._id}`, state: { isOwner } });
  };

  return (
    exp.isActive && (
      <div
        onClick={handleNavigate}
        className="cursor-pointer hover:scale-105 transform transition duration-300 ease-out"
      >
        <div className="relative h-80 w-80 flex-shrink-0">
          <ImageComponent src={img} alt="image" />
        </div>
        <h3 className="text-2xl mt-3">
          {/* {exp.location} */}
          {`${exp.location && exp.location.substring(0, 25)}...`}
        </h3>
      </div>
    )
  );
};

export default MediumCard;
