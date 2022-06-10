import React, { useState } from "react";
import {
  ChatAlt2Icon,
  ChatAltIcon,
  ChevronRightIcon,
  DocumentIcon,
  FilterIcon,
  TicketIcon,
} from "@heroicons/react/outline";
import moment from "moment";
import { diffDays } from "../../actions/experience";
import TicketModal from "../modals/TicketModal";
const SingleBooking = ({ handleCreateConversation, booking, image }) => {
  const product = {
    highlights: [
      "Lorem ipsum dolor sit am",
      "Lorem ipsum dolor sit a",
      "Lorem ipsum dolor sit",
      "Lorem ipsum dolor si",
    ],
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <main className="flex-auto">
      <div className="overflow-hidden">
        <div className="max-w-[85rem] mx-auto px-1 lg:px-2 py-2">
          <div className="bg-white border-b">
            <div className="pt-2">
              <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                <div className="lg:col-span-2 lg:pr-8">
                  <h1 className="text-lg font-bold tracking-tight lg:text-xl">
                    <span className="text-gray-900 ">Your trip to </span>
                    <span className="text-orange-500">
                      {booking.experience.location}
                    </span>
                  </h1>
                </div>
              </div>
              {/* Image gallery */}
              <div className="mt-6 max-w-xl h-64 lg:h-80 mx-auto px-4 sm:px-4 lg:px-6 lg:max-w-7xl lg:px-8 grid grid-cols-1">
                <div className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt="experience-image"
                    className="w-full h-full object-center object-cover"
                  />
                </div>
              </div>

              {/* Product info */}
              <div className="max-w-2xl mx-auto pt-2 pb-3 px-4 sm:px-6 lg:max-w-7xl lg:pt-5 lg:pb-8 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                <div className="lg:col-span-2 lg:border-r flex justify-between items-center lg:border-gray-200 lg:pr-8">
                  <h2 className="text-lg tracking-tight font-semibold text-gray-900 lg:text-xl">
                    Hosted by{" "}
                    <a
                      href="#"
                      className="text-orange-500 hover:text-orange-700 hover:underline"
                    >
                      {" "}
                      {booking.experience.postedBy.name}
                    </a>
                  </h2>
                </div>

                {/* Options */}
                <div className="mt-1 lg:row-span-3">
                  <h2 className="sr-only">More information</h2>
                  {/* From To */}
                  <div className="py-2">
                    <div className="flex items-center justify-between">
                      <h3 className="lg:text-xl text-lg text-gray-500 text-semibold">
                        {moment(new Date(booking.experience.startDate)).format(
                          "Do MMMM YYYY"
                        )}{" "}
                        -{" "}
                        {moment(new Date(booking.experience.endDate)).format(
                          "Do MMMM YYYY"
                        )}
                      </h3>
                    </div>
                  </div>
                  <div class="grid grid-cols-1 divide-y">
                    <div
                      onClick={handleCreateConversation}
                      className="py-3 flex justify-between items-center cursor-pointer"
                    >
                      <h5 className="flex items-center">
                        <ChatAlt2Icon className="w-4 h-4 mr-2" />
                        Message your host
                      </h5>
                      <p>
                        <ChevronRightIcon className="w-4 h-4" />
                      </p>
                    </div>
                    <div
                      onClick={() => setShowModal(!showModal)}
                      className="py-3 flex justify-between items-center cursor-pointer"
                    >
                      {showModal && (
                        <TicketModal
                          showModal={showModal}
                          setShowModal={setShowModal}
                          booking={booking}
                        />
                      )}

                      <h5 className="flex items-center">
                        <TicketIcon className="w-4 h-4 mr-2" />
                        View your ticket
                      </h5>
                      <p>
                        <ChevronRightIcon className="w-4 h-4" />
                      </p>
                    </div>
                    <div className="py-3 flex justify-between items-center cursor-pointer">
                      <h5 className="flex items-center">
                        <DocumentIcon className="w-4 h-4 mr-2" />
                        Print PDF
                      </h5>
                      <p>
                        <ChevronRightIcon className="w-4 h-4" />
                      </p>
                    </div>
                  </div>
                  {diffDays(
                    booking.experience.startDate,
                    booking.experience.endDate
                  ) >= 7 && (
                    <button className=" mt-5 w-full cursor-pointer bg-orange-500 rounded-sm py-2 flex items-center justify-center text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed">
                      Cancel order
                    </button>
                  )}
                </div>

                <div className="py-10  lg:pt-4 lg:pb-10 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-6">
                  {/* Description and details */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Description
                    </h3>
                    <div className="space-y-4">
                      <p className="text-base text-gray-700">
                        {booking.experience.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Cancellation Policy
                    </h3>
                    <div className="space-y-4">
                      <p className="text-base text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Provided by the host
                    </h3>

                    <div className="mt-2">
                      <ul
                        role="list"
                        className="pl-4 list-disc text-sm space-y-2"
                      >
                        {product.highlights.map((highlight) => (
                          <li key={highlight} className="text-gray-400">
                            <span className="text-gray-600">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SingleBooking;