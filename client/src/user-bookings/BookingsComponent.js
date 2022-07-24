import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import BookingCardMedium from "./BookingCardMedium";
import { getUserBookings } from "../actions/experience";
import { fetchUserBookings } from "../Redux/reducers/experiences";
import NoResults from "../components/shared/NoResults";

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
  });

  return bookings.length === 0 ? (
    <NoResults message="Sorry, all alone out here" />
  ) : (
    <main className="max-w-full mx-auto shadow-xs bg-white rounded-md p-3 mt-2">
      <div className="grid grid-cols-1 space-x-2 md:grid-cols-4 my-2 ">
        {/* {bookings.length <1 && [1,2,3,4].map((n) => <div className="gap-2"><Skeleton key={n}  /></div>)} */}
        {bookings &&
          bookings.map(
            (booking) =>
              booking &&
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
