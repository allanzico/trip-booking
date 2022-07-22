import React, {useEffect, useState} from 'react'
import ImageComponent from '../shared/ImageComponent'
import { diffDays } from "../../actions/experience";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from 'react-router-dom';


const SmallCard = ({exp,img}) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const user = auth === undefined ? null : auth?.user;
  const history = useHistory();
  const source = axios.CancelToken.source();
  const [favorites, setFavorites] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (auth == null) return
    if (exp.postedBy?._id === user?._id) {
      setIsOwner(true)
    }
    return () => {
      source.cancel();
    };
  }, []);

  const handleNavigate =(e)=> {
    e.preventDefault()
    history.push({pathname: `/experience/${exp._id}`, state: {isOwner}})
  }
  return (
    <div onClick={handleNavigate} className='flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out'>
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