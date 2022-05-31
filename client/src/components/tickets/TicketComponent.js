import React from "react";
import { getUserBookings } from "../../actions/experience";
import ImageComponent from "../shared/ImageComponent";
import moment from "moment";
import { QrcodeIcon } from "@heroicons/react/outline";
import { QrcodeOutlined } from "@ant-design/icons";
import { AiOutlineQrcode } from "react-icons/ai";

const TicketComponent = ({ booking }) => {
  console.log(booking);
  return (
    <div className="grid rounded-lg border grid-cols-9 flex pr-2 hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t">
      <div className="col-span-7 ">
        <div className="flex flex-row justify-between items-center">
          <div className="ml-5 mt-4 items-center border border-white">
            <AiOutlineQrcode className="text-gray-900 h-28 w-28 " />
          </div>
          <div className="flex flex-col">
            <h1 className="text-gray-900 pt-2 text-4xl font-extrabold tracking-widest">
              {booking.orderedBy.name}
            </h1>
            <p className="pt-4 text-l text-gray-900">
              <span>
                {" "}
                {moment(new Date(booking.experience.startDate)).format(
                  "Do MMMM YYYY"
                )}{" "}
                -{" "}
              </span>
              <span>
                {moment(new Date(booking.experience.endDate)).format(
                  "Do MMMM YYYY"
                )}
              </span>
            </p>
            <div className="text-gray-900 text-l">{booking.experience.title}</div>
            <div className="text-gray-900 text-l">
              {" "}
              {booking.experience.location}
            </div>
            <div className="py-2">
            <button
              type="submit"
              className="cursor-pointer text-black border rounded-sm text-xs font-semibold px-3 py-2 text-center uppercase"
            >
              Download
            </button>
            </div>
          </div>
          <div className="flex px-3 flex-col items-center gap-1">
            <span className="uppercase text-l text-gray-900 font-semibold">
              {moment(new Date(booking.experience.startDate)).format("MMMM")}
            </span>
            <span className="uppercase text-4xl text-gray-900 font-semibold">
              {moment(new Date(booking.experience.startDate)).format("DD")}
            </span>
          </div>
        </div>
      </div>
      <div className="col-span-2 py-4 border-l-2 border-gray-500 border-dashed ">
      <div className="flex flex-row items-center justify-between ">
        <div className="flex flex-row items-center">
        <div className=" transform rotate-180 uppercase font-semibold text-xl" style={{ writingMode: 'vertical-rl' }}>Admits one</div>
        <div className=" transform rotate-180 text-md" style={{ writingMode: 'vertical-rl' }}>{booking.orderedBy.name}</div>
        <div className=" transform rotate-180 text-xs" style={{ writingMode: 'vertical-rl' }}> {moment(new Date(booking.experience.startDate)).format("Do MMMM")}</div>
                <div className=" transform rotate-180 text-xs" style={{ writingMode: 'vertical-rl' }}>{`${booking.experience.title.substring(
          0,
          15
        )}...`}</div>
        </div>
               <div className="mr-5">
            <AiOutlineQrcode className="text-orange-500 h-24 w-24" />
          </div>
      </div>
      </div>
    </div>
  );
};

export default TicketComponent;
