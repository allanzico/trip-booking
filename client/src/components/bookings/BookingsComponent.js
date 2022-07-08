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
import { Skeleton } from "antd";

const BookingsComponent = () => {
  const bookings = useSelector((state) => state.experiences.bookings);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const source = axios.CancelToken.source();
  const {
    auth: { token },
  } = useSelector((state) => ({ ...state }));

  const loadUserBookings = async () => {
    setLoading(true)
    try {
      const res = await getUserBookings(token, source.token);
      if (!res) setLoading(true)
      dispatch(fetchUserBookings(res.data));
      setLoading(false)
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
    
    <main className="max-w-full mx-auto shadow-xs bg-white rounded-md p-3 mt-2">
        <div className="grid grid-cols-1 space-x-2 md:grid-cols-4 my-2 ">
        {/* {bookings.length <1 && [1,2,3,4].map((n) => <div className="gap-2"><Skeleton key={n}  /></div>)} */}
          { bookings && bookings.map(
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
