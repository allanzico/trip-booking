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
      <SideBarRow Icon={CollectionIcon} title="Listings" linkTo="/dashboard/seller" />
      <SideBarRow Icon={TicketIcon} title="Tickets" linkTo="/user-tickets" />
      <SideBarRow Icon={ArchiveIcon} title="Bookings" linkTo="/user-experience-bookings" />
      <SideBarRow Icon={HeartIcon} title="Favorites" />
      <SideBarRow Icon={CashIcon} title="Payment" linkTo="/add-payment-method" />
      <SideBarRow Icon={CogIcon} title="Settings" linkTo="/settings" />
    </div>
  );
};

export default SideBar;
