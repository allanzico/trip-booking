import React, { useState } from "react";
import { currencyFormatter } from "../../actions/stripe";
import { diffDays } from "../../actions/experience";
import { useHistory } from "react-router-dom";

import OrderModal from "../modals/OrderModal";

const BookingCard = ({ experience, session, orderedBy }) => {
  
  const [showModal, setShowModal] = useState(false);

  return (
    <div class="flex w-full overflow-hidden bg-white rounded-md shadow-md duration-300">
      <div class="w-1/3 bg-cover">
        {experience.files.length > 0 ? (
          <img
            src={experience.files[0].url}
            alt="experiences-image"
            className="rounded-x-md h-full w-full object-cover"
          />
        ) : (
          <img
            src="https://via.placeholder.com/900x500.png?text=PREVIEW"
            alt="experiences-default-image"
            className="rounded-x-md h-full w-full object-cover"
          />
        )}
      </div>

      <div class="w-2/3 p-4 md:p-4">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">
          {experience.title}
        </h1>

        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {`${experience.description.substring(0, 100)}...`}
        </p>

        <div class="flex mt-2 item-center">
          <span class="hover:bg-gray-300 delay-100 duration-100 bg-gray-200 rounded-sm py-1 px-2 text-xs">
            Available for {diffDays(experience.startDate, experience.endDate)}{" "}
            {diffDays(experience.startDate, experience.endDate) == 1
              ? " day"
              : " days"}
          </span>
        </div>

        <div class="flex justify-between mt-3 item-center">
          <p class="text-xl font-black text-orange-500">
            {currencyFormatter({
              amount: experience.price * 100,
              currency: "eur",
            })}
            <span class="font-normal text-gray-600 text-base">/person</span>
          </p>
          {showModal && (
            <OrderModal
              session={session}
              orderedBy={orderedBy}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          )}
          {/* view Payment details  Button  */}
          <button
            type="submit"
            className="
              flex text-xs border px-3 my-auto py-2 mr-2
              border-orange-500 group hover:bg-orange-500 
              rounded-xs
              transition-all duration-200
              hover:text-white
                    "
            onClick={() => setShowModal(!showModal)}
          >
            View Payment info
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
