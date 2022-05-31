import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TicketComponent from './TicketComponent'
import axios from "axios";
import { fetchUserBookings } from '../../Redux/reducers/experiences';
import { getUserBookings } from '../../actions/experience';

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
    <main className="flex">
        <section className="flex-grow">
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="filter-component-button">Button</p>
            <p className="filter-component-button">Another Button</p>
            <p className="filter-component-button">More Button</p>
            <p className="filter-component-button">Cool Button</p>
          </div>
          <div className="flex flex-col gap-2"> {
            bookings && bookings.map((booking) =><TicketComponent booking={booking} /> )
          }
            
          </div>
        </section>
      </main>
  )
}

export default Tickets