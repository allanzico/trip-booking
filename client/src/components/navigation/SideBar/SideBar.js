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
    <div className="flex flex-col col-span-2 bg-slate-50 m-3 rounded-l items-center px-4 md:items-start">
      <img
        src="https://cdn.pixabay.com/photo/2015/09/15/21/26/cat-941821_960_720.png"
        className="h-20 w-20 m-3"
        alt="logo"
      />

      <div className="flex max-w-fit cursor-pointer items-center space-x-2 px-4 py-2 rounded-md hover:bg-orange-700 bg-orange-500 text-white transition-all duration-200 group ">
        <PlusIcon className="w-5 h-5" />
        <p className="hidden md:inline-flex text-base font-light lg:text-xl hover:text-white">
          Add shit
        </p>
      </div>
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
