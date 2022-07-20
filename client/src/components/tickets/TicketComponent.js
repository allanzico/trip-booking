import React, { useRef } from "react";
import { AiOutlineQrcode } from "react-icons/ai";
import moment from "moment";
import { DocumentDownloadIcon } from "@heroicons/react/outline";
import * as htmlToImage from 'html-to-image';

const TicketComponent = ({ booking, ticket }) => {

  const domElement = useRef(null);
  const downloadImage = async () => {
    const dataUrl = await htmlToImage.toPng(domElement.current);
 
    // download image
    const link = document.createElement('a');
    link.download = `${ticket._id}.png`;
    link.href = dataUrl;
    link.click();
  }
  return (
    <div  className="grid grid-cols-9">
      <div id="experience-ticket" ref={domElement} className="col-span-8 bg-white w-full">
        <div className="flex flex-col px-3 pt-3 pb-2 gap-2 border-1 border-gray-200 over:opacity-80 hover:shadow-lg transition duration-200 ease-out">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
              <p className="text-xs font-semibold tracking-widest uppercase">
                {ticket.ticketTitle}
              </p>
              <p className="text-md text-gray-900 font-normal tracking-wide">
                {booking.orderedBy?.firstName} {booking.orderedBy?.lastName}
              </p>
              <p className="text-xs text-gray-500 font-normal text-wrap">
                {booking.experience?.location}
              </p>
            </div>
            <div className="flex px-3 flex-col items-center gap-1">
              <span className="uppercase text-4xl text-orange-500 font-semibold">
                {moment(new Date(booking.experience?.startDate)).format("DD")}
              </span>
              <span className="uppercase text-l text-gray-900 font-semibold">
                {moment(new Date(booking.experience?.startDate)).format("MMMM")}
              </span>
            </div>
            <div className="flex flex-col">
              <AiOutlineQrcode className="text-gray-900 h-16 w-16 " />
            </div>
          </div>

          <div className="flex flex-row items-center justify-between mt-4">
            <p className="tracking-wide text-xs text-wrap">
              {booking.experience?.title}
            </p>
            <p className="tracking-wide text-xs font-semibold text-wrap">
              Admits {ticket.quantity}
            </p>
    
          </div>
        </div>
      </div>
      <div className="col-span-1 px-2">
        <button
          onClick={downloadImage}
          type="submit"
          className="hover:p-2 hover:bg-gray-300 hover:scale-105 transition transform duration-200 ease-out"
        >
          <DocumentDownloadIcon className="w-6 h-6 text-gray-700 " />
        </button>
      </div>
    </div>
  );
};

export default TicketComponent;
