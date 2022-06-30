import { PlusIcon, RefreshIcon } from "@heroicons/react/outline";
import React from "react";
import { useSelector } from "react-redux";
import { Switch, useLocation, Link } from "react-router-dom";
import BookingsComponent from "../components/bookings/BookingsComponent";
import PrivateRoute from "../components/PrivateRoute";
import EditExperience from "../experiences/Edit/EditExperience";
import DashboardSeller from "../user/DashboardSeller";
import Messaging from "../messaging/Messaging";
import PaymentComponent from "../components/payment/PaymentComponent";
import Tickets from "../components/tickets/Tickets";
import ViewBookings from "../components/bookings/ViewBookings";
import CreateExperience from "../experiences/Create/CreateExperience";
import Settings from "../settings/Settings";
import SellerRoute from "../components/SellerRoute";
import DashboardHome from "./DashboardHome";
import CreateItenerary from "../itenerary/CreateItenerary";

const MiddleContent = () => {
  const { pathname } = useLocation();
  let heading;
  switch (pathname) {
    case "/user-experience-bookings":
      heading = "Bookings";
      break;
    case "/dashboard/seller":
      heading = "Listings";
      break;
    case "/user-tickets":
      heading = "Tickets";
      break;
    case "/add-payment-method":
      heading = "Payments";
      break;
      case "/settings":
        heading = "Settings";
        break;
  }

  return (
    <div className="col-span-7 lg:col-span-5 mt-2 pb-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="px-1 md:px-2 py-1 md:py-2 pb-0 text-2xl md:text-4xl font-bold">
            {heading}
            {/* Hello, <span className="text-orange-500">{user.name}</span> */}
          </h1>
          {/* <h5 className="px-5 py-2 pb-0 md:text-xl text-gray-500 font-light">
            Welcome back to experiences where memories are created
          </h5> */}
        </div>
        {/* <RefreshIcon className='h-8 w-8 cursor-pointer text-orange-500 transition-all duration-500 ease-out hover:rotate-180 active:scale-125' hidden={heading !=='Listings'} /> */}
      </div>
      <hr className="m-1 md:m-2 text-gray-600" />

      <section className="px-1 md:px-2 pb-0 ">
        <Switch>
          <SellerRoute  exact
            path="/dashboard/seller"
            component={DashboardSeller} />
          {/* <PrivateRoute
            exact
            path="/dashboard/home"
            component={DashboardHome}
          /> */}
           <PrivateRoute
            exact
            path="/user-experience-bookings"
            component={BookingsComponent}
          />
          <PrivateRoute
            exact
            path="/experiences/new"
            component={CreateExperience}
          />
          <PrivateRoute
            exact
            path="/experience/edit/:expId"
            component={EditExperience}
          />
                    <PrivateRoute
            exact
            path="/itenerary/:expId"
            component={CreateItenerary}
          />
          <PrivateRoute exact path="/user-tickets" component={Tickets} />
          <PrivateRoute exact path="/settings" component={Settings} />

          <PrivateRoute
            exact
            path="/booking/:bookingId"
            component={ViewBookings}
          />

          <PrivateRoute
            exact
            path="/add-payment-method"
            component={PaymentComponent}
          />
        </Switch>
      </section>
    </div>
  );
};

export default MiddleContent;
