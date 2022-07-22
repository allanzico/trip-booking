import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { getSingleBooking } from '../actions/experience';
import { fetchSingleBooking } from '../Redux/reducers/experiences';
import { createConversation, getConversations } from '../actions/conversations';
import { fetchChats } from '../Redux/reducers/messaging';
import SingleBooking from './SingleBooking';

const ViewBookings = ({match}) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token, user } = auth;
  const bookings = useSelector((state) => state.experiences);
  const singleBooking = useSelector((state) => state.experiences.singleBooking);
  const conversations = useSelector((state) => state.messaging.conversations);
  const dispatch = useDispatch();
  const source = axios.CancelToken.source();

  useEffect(() => {
    loadSingleBooking();
    handleGetConversations()
    return () => {
      source.cancel();
    };
  }, []);

  const loadSingleBooking = async () => {
    try {
      const res = await getSingleBooking(match.params.bookingId, token, source.token);
     
      dispatch(fetchSingleBooking(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetConversations = async () => {
    try {
      const res = await getConversations(user._id, token, source.token);
      dispatch(fetchChats(res.data))
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateConversation = async () => {
    
    let receiver;
    conversations.map((conversation) => {
      conversation.members.map((m) => {
      if (m === bookings.singleBooking.experience.postedBy._id) {
        receiver = m
      }
    });
  });

    const data = {
      senderId: user._id,
      receiverId: bookings.singleBooking.experience.postedBy._id,
    };
    try {
      if (receiver) {
        window.location.href = "/messaging";
      }
      await createConversation(token, data);
      window.location.href = "/messaging";
    } catch (error) {}
  };


  return (
    <div>
          <SingleBooking handleCreateConversation={handleCreateConversation} booking={singleBooking}/>
    </div>
  )
}

export default ViewBookings