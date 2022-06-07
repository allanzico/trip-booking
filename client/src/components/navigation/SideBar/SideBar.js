import {
  ArchiveIcon,
  CashIcon,
  ChatIcon,
  CogIcon,
  CollectionIcon,
  HeartIcon,
  HomeIcon,
  PlusIcon,
  TicketIcon,
} from "@heroicons/react/outline";
import { UserGroupIcon } from "@heroicons/react/solid";

import React from "react";
import { Link } from "react-router-dom";
import SideBarRow from "./SideBarRow";

const SideBar = () => {
  return (
    <div className="flex flex-col col-span-2 h-screen bg-white m-2 md:m-4 rounded-md items-center p-4 md:items-center">
      {/* <div className="flex max-w-fit cursor-pointer items-center space-x-2 px-4 py-2 rounded-md hover:bg-orange-700 bg-orange-500 text-white transition-all duration-200 group ">
        <PlusIcon className="w-5 h-5" />
        <p className="hidden md:inline-flex text-base font-light lg:text-xl hover:text-white">
          Add shit
        </p>
      </div> */}
      <SideBarRow Icon={CollectionIcon} title="Listings" linkTo="/dashboard/seller" />
      <SideBarRow Icon={TicketIcon} title="Tickets" linkTo="/user-tickets" />
      <SideBarRow Icon={ArchiveIcon} title="Bookings" linkTo="/user-experience-bookings" />
      <SideBarRow Icon={HeartIcon} title="Favorites" />
      <SideBarRow Icon={CashIcon} title="Payment" linkTo="/add-payment-method" />
      <SideBarRow Icon={CogIcon} title="Settings" />
    </div>
  );
};

export default SideBar;
