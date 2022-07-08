import { HeartOutlined, StarFilled } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import ImageComponent from "../shared/ImageComponent";
import { currencyFormatter } from "../../actions/stripe";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  diffDays,
  favoriteExperience,
  getUserFavorites,
  isAlreadyFavorited,
} from "../../actions/experience";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  createFavoriteExperience,
  fetchFavorites,
} from "../../Redux/reducers/experiences";

const InfoCard = ({ exp, lowestPrice}) => {
  const favorites = useSelector((state) => state.experiences.favorites);
  const { auth } = useSelector((state) => ({ ...state }));
  const user = auth === undefined ? null : auth?.user;
  const token = auth === undefined ? null : auth?.token;
  const history = useHistory();
  const source = axios.CancelToken.source();
  const [alreadyFavorited, setAlreadyFavorited] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const dispatch = useDispatch();
  let location = useLocation();
  useEffect(() => {
    loadFavorites();
    if (auth == null) return
    if (exp.postedBy?._id === user?._id) {
      setIsOwner(true)
    }
    return () => {
      source.cancel();
    };
  }, []);

  // useEffect(() => {
  //   if (auth && token) {
  //     isAlreadyFavorited(token, selectedId, source.token).then(
  //       (res) => {
  //         if (res.data.ok) setAlreadyFavorited(true);
  //       }
  //     );
  //   }

  //   return () => {
  //     source.cancel();
  //   };
  // }, [])

  const loadFavorites = async () => {
    try {
      let res = await getUserFavorites(token, source.token);
      dispatch(fetchFavorites(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const isAlreadyFavorited = (expId) => {
    let ids = [];
    for (let i = 0; i < favorites.length; i++) {
      ids.push(favorites[i].experience._id.toString());
    }
    // console.log(ids.includes(expId))
    // if (ids.includes(exp._id)) {
    //   setAlreadyFavorited(true);
      
    // }
    const found = ids.some(el => el === expId);
    console.log(ids)
    
  };

  //Create favorites
  const addFavorite = async (e) => {
    e.stopPropagation();
    const data = {
      experience: exp._id,
      favoritedBy: user._id,
    };
    isAlreadyFavorited(data.experience);
    try {
      let res = await favoriteExperience(token, data);
      dispatch(createFavoriteExperience(res.data));
    } catch (error) {
      console.log(error)
    }
  };

  const handleNavigate =(e)=> {
    e.preventDefault()
    
    history.push({pathname: `/experience/${exp._id}`, state: {isOwner}})
  }

  return (
    <div
      className="flex py-7 px-2 pr-4 border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t"
      onClick={handleNavigate}
    >
      <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
        {exp.image && exp.image.contentType ? (
          <ImageComponent
            src={`${process.env.REACT_APP_API}/experience/image/${exp._id}`}
            alt={exp.title}
          />
        ) : (
          <ImageComponent
            src="https://via.placeholder.com/900x500.png?text=PREVIEW"
            alt="experience-default-image"
          />
        )}
      </div>
      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-between">
          <p>{exp.location}</p>
          <HeartOutlined className="h-7 cursor-pointer" onClick={addFavorite} />
        </div>
        <h4 className="text-xl">{exp.title}</h4>
        <div className="border-b w-10 pt-2" />
        <p className="pt-2 text-sm text-gray-500 flex-grow">{`${ exp.description && exp.description.substring(
          0,
          150
        )}...`}</p>
        <p className="pt-2 text-sm text-gray-500 flex-grow">
          <span class="hover:bg-gray-300 delay-100 duration-100 bg-gray-200 rounded-sm py-1 px-2 text-xs">
            {diffDays(new Date(), exp.startDate)}{" "}
            {diffDays(new Date(), exp.startDate) == 1 ? " day" : " days"} left
          </span>
        </p>
        <div className="flex justify-between items-end pt-5">
          <p className="flex items-center">
            <StarFilled className="h-5 text-orange-500" /> 4.5
          </p>
          <div>
            <p className="text-lg font-semibold pb-2 lg:text-2xl text-orange-500">
              
             <span class="font-normal text-gray-600 text-base">From </span> {currencyFormatter({
                amount: lowestPrice * 100,
                currency: "ugx",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
