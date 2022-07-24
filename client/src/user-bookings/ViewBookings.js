import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { getSingleBooking } from '../actions/experience';
import { fetchSingleBooking } from '../Redux/reducers/experiences';
import { currentChatSet,  } from '../Redux/reducers/messaging';
import SingleBooking from './SingleBooking';
import { createChat } from '../actions/chat';


const ViewBookings = ({match}) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token} = auth;
  const singleBooking = useSelector((state) => state.experiences.singleBooking);
  const dispatch = useDispatch();
  const source = axios.CancelToken.source();
  useEffect(() => {
    loadSingleBooking();
    return () => {
      source.cancel();
    };
  });

  const loadSingleBooking = async () => {
    try {
      const res = await getSingleBooking(match.params.bookingId, token, source.token);
      dispatch(fetchSingleBooking(res.data));
    } catch (error) {
      console.log(error);
    }
  };


 const handleCreateChat = async () => {
  const data = {
    userId: singleBooking.experience.postedBy._id
  }
  try {
    const res = await createChat(token, data );
    dispatch(currentChatSet(res.data));
    window.location.href = "/messaging";
  } catch (error) {
    console.log(error);
  }
 }


  return (
    <div>
          <SingleBooking booking={singleBooking} handleCreateChat={handleCreateChat}/>
    </div>
  )
}

export default ViewBookings