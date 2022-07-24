import moment from "moment";
import React, { useState } from "react";
import TicketComponent from "./TicketComponent";
import ImageComponent from "../components/shared/ImageComponent";
import { useSelector } from "react-redux";
import { createOrder } from "../actions/orders";
const CheckoutComponent = ({ history }) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token,} = auth;
  const experience = history.location.state.experience;
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const itemsPrice = cart.reduce(
    (acc, item) => acc + item.ticketPrice * item.quantity,
    0
  );
  const taxPrice = Math.round(itemsPrice * 0.14);
  const totalPrice = itemsPrice + taxPrice;

  const handleBooking = async () => {

    const booking = {
      experience: experience._id,
      cart: cart,
    };
    setLoading(true);
    try {
     const res = await createOrder(booking, token);
     if (res.data) {
        setLoading(false);
        history.push({
          pathname: "/order-success",
          state: {experience, cart, totalPrice},
        })
     }
      
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="mt-5">
      <h1 class="sr-only">Checkout</h1>

      <div class="relative mx-auto max-w-screen-2xl">
        <div class="grid grid-cols-1 md:grid-cols-2">
          <div class="py-3 bg-gray-50">
            <div class="max-w-lg px-2 mx-auto">
              <div class="mt-8">
                <p class="text-2xl font-medium tracking-tight">
                  Tickets for trip to{" "}
                  <span className="text-orange-500">{experience.location}</span>
                </p>

                <div className="flex flex-row items-left gap-1">
                  <p className="text-xs text-gray-500 font-medium">
                    {moment(new Date(experience.startDate)).format(
                      "Do MMMM YYYY"
                    )}
                  </p>
                  <p className="text-xs text-gray-900 font-medium">to</p>
                  <p className="text-xs text-gray-500 font-medium">
                    {moment(new Date(experience.endDate)).format(
                      "Do MMMM YYYY"
                    )}
                  </p>
                </div>
              </div>

              <div class="mt-12">
                <ul class="-my-4 divide-y divide-gray-200">
                  {experience.tickets &&
                    experience.tickets.map((ticket) => (
                      <TicketComponent
                        ticket={ticket}
                        cart={cart}
                        setCart={setCart}
                      />
                    ))}
                </ul>
              </div>
            </div>
          </div>

          <div class="py-3 bg-white">
            <div class="max-w-lg px-2 mx-auto">
              <div className="flex flex-col gap-4">
                <div className="w-full h-64">
                  {experience.files.length > 0 ? (
                    <ImageComponent
                    src={experience.files[0]?.url}
                    alt={experience.title}
                  />
                  ):<ImageComponent
                  src="https://via.placeholder.com/1000x1000"
                  alt={experience.title}
                />}
                  
                </div>
                <div>
                  <p>
                    {cart &&
                      cart.map((item) => (
                        <div className="flex flex-row justify-between">
                          <p>
                            {item.quantity}x {item.ticketTitle}
                          </p>
                          <p>{item.ticketPrice * item.quantity}</p>
                        </div>
                      ))}
                  </p>
                </div>
                <hr className="-my-4 text-gray-500" />
                {cart.length > 0 && (
                  <>
                  <div>
                    <div className="flex flex-row justify-between">
                      <p className="text-xs uppercase font-normal text-gray-600">
                        Sub total
                      </p>
                      <p>{itemsPrice}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p className="text-xs uppercase font-normal text-gray-600">
                        Tax 14%
                      </p>
                      <p>{taxPrice}</p>
                    </div>
                    
                  </div>
                  <hr className="-my-4 text-gray-500" />
                  </>
                )}
                
                {cart.length > 0 && (
                  <div className="flex flex-row justify-between">
                    <p className="text-xl uppercase font-semibold text-gray-600">
                      Total
                    </p>
                    <p className="text-xl uppercase font-semibold text-gray-600">
                      {totalPrice}
                    </p>
                  </div>
                )}

                <div class="grid grid-cols-6">
                  <div class="col-span-6">
                    <button
                      onClick={handleBooking}
                      disabled={cart.length === 0}
                      className="
                      disabled:opacity-50 disabled:cursor-not-allowed          
                    w-full               
                    text-white
                    bg-orange-500
                    rounded-sm
                    px-3
                    py-2
                    transition
                    hover:bg-orange-700
                    uppercase"
                      type="submit"
                    >
                      {loading
                        ? "Sending..."
                        : " Pay Now"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutComponent;
