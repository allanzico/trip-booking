import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../Typography/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookings } from "../../actions/experience";
import BookingCard from "../cards/BookingCard";
import { fetchUserBookings } from "../../Redux/reducers/experiences";
import axios from "axios";
import BookingsSmallCard from "../cards/BookingsSmallCard";
import BookingCardMedium from "./BookingCardMedium";
import {FaBoxOpen} from "react-icons/fa"

const BookingsComponent = () => {
  const bookings = useSelector((state) => state.experiences.bookings);
  const dispatch = useDispatch();
  const source = axios.CancelToken.source();
  const {
    auth: { token },
  } = useSelector((state) => ({ ...state }));

  const loadUserBookings = async () => {
    try {
      const res = await getUserBookings(token, source.token);
      dispatch(fetchUserBookings(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadUserBookings();
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <main className="max-w-full mx-auto shadow-xs bg-white rounded-md py-3">
        <div className="grid grid-cols-1 space-x-2 md:grid-cols-4 my-2 ">
          {bookings.length < 1  ? (<div className="flex row justify-center items-center min-w-1/2 h-56">
            <span><FaBoxOpen className="h-32 w-32" /></span>
  
            <p className="text-xl">
              You do not have any bookings, please checkout some <Link className="text-orange-500 cursor-pointer" to="">experiences</Link> and have fun!
            </p>
          </div>) : bookings.map(
            (booking) =>
              booking.experience && (
                <BookingCardMedium
                  key={booking._id}
                  experience={booking.experience}
                  session={booking.session}
                  orderedBy={booking.orderedBy}
                  bookingId={booking._id}
                />
              )
          )}
        </div>
    </main>
  );
};

export default BookingsComponent;
