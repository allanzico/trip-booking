import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import axios from "axios";
import { fetchUserBookings } from '../../Redux/reducers/experiences';
import { getUserBookings } from '../../actions/experience';
import TicketComponent from './TicketComponent';
import NoResults from '../shared/NoResults';

const Tickets = () => {
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
    bookings.length === 0 ? (<NoResults message="No tickets"/>) : (    <main className="flex">
    <section className="flex-grow mt-3">
      <div className="flex flex-col gap-5"> {
        bookings && bookings.map((booking) =>(
          <div className='flex flex-col gap-2'>
            <h2 className='mb-2 text-md font-semibold text-gray-900'>{booking.experience.title}</h2>
            { booking?.cart && booking.cart?.map((ticket) => (
            <TicketComponent  booking={booking} ticket={ticket} />
          )
        )}
          </div>
           ) )
      }
        
      </div>
    </section>
  </main>)
  )
}

export default Tickets