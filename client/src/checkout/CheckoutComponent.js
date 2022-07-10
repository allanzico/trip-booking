import moment from "moment";
import React from "react";
import TicketComponent from "./TicketComponent";

const CheckoutComponent = ({ history }) => {
  const experience = history.location.state.experience;
  
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
                      <TicketComponent ticket={ticket} />
                    ))}
                </ul>
              </div>
            </div>
          </div>

          <div class="py-3 bg-white">
            <div class="max-w-lg px-2 mx-auto">
              <div className="flex flex-col gap-4">
                <div>Image</div>
                <div>Sub totals</div>
                <div class="grid grid-cols-6">
                  <div class="col-span-6">
                    <button
                      className="          
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
                      Pay Now
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
