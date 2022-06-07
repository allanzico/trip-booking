import React, { useEffect, useState } from "react";

import ConnectNav from "../components/navigation/ConnectNav";
import {HashRouter, Link,  Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import DashboardSeller from "./DashboardSeller";
import NewExperiences from "../experiences/Create/NewExperience";
import { UserOutlined } from "@ant-design/icons";
import {RiSuitcase3Line} from 'react-icons/ri'
import { MdOutlineSettings } from "react-icons/md";
import EditProfile from "./EditProfile";

import {
  getAccountBalance,
  currencyFormatter,
  payoutSetting,
} from "../actions/stripe";
import { useSelector } from "react-redux";
import EditExperience from "../experiences/Edit/EditExperience";
import BookingsComponent from "../components/bookings/BookingsComponent";


const Dashboard = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { user, token } = auth;
  const [loading, setLoading] = useState(false);

  const handlePayoutSettings = async () => {
    setLoading(true);
    try {
      const res = await payoutSetting(token);
      // window.location.href = res.data.url;
      window.open(res.data.url, '_blank').focus();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


 

  return (
    <>

<div class="p-4 mx-auto lg:w-3/4">
<div className="p-4 mb-4">

<ConnectNav/>
  
</div>

<HashRouter>
  <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-2">
  <div class="flex flex-col w-full justify-center  margin-r-2">
        <div class="sticky top-0 rounded-xl w-full h-full">
            <ul class="flex sm:flex-col overflow-hidden content-center justify-center">
                <li class="py-2">
                    <Link className=" inline-flex items-center text-gray-600 hover:w-full hover:bg-orange-500 hover:text-white block px-3 py-2 rounded-sm text-base font-medium" to="/dashboard/seller">
                      <RiSuitcase3Line className="sm:mx-2 text-2xl md:text-sm lg:text-sm " />  <span class="hidden sm:inline">Listings</span>
                    </Link>
                </li>
                <li class="py-2">
                    <Link className="inline-flex items-center text-gray-600 hover:w-full hover:bg-orange-500 hover:text-white block px-3 py-2 rounded-sm text-base font-medium" to="/user-experience-bookings">
                    <RiSuitcase3Line className="sm:mx-2 text-2xl md:text-sm lg:text-sm " /> <span class="hidden sm:inline">Bookings</span>
                    </Link>
                </li>
                <li class="py-2 ">
                <Link className=" inline-flex items-center text-gray-600 hover:w-full hover:bg-orange-500 hover:text-white block px-3 py-2 rounded-sm text-base font-medium" to="/edit-profile">
                     <RiSuitcase3Line className="sm:mx-2 text-2xl md:text-sm lg:text-sm " /> <span class="hidden sm:inline">Edit profile</span>
                </Link>
                </li>
                
                  {
                    auth &&
                    auth.user &&
                    auth.user.stripe_seller &&
                    auth.user.stripe_seller.charges_enabled && (
                      <button onClick={handlePayoutSettings} className=" inline-flex  items-center bg-orange-500 text-white block px-3 py-2 rounded-sm text-base font-medium">
                        <MdOutlineSettings className="sm:mx-2 text-2xl md:text-sm lg:text-sm " /> <span class="hidden sm:inline">Stripe Payouts</span>
                      </button>
                    )
                  }
               
            </ul>
        </div>
    </div>
    <div class="flex flex-col md:col-span-3 lg:col-span-3 w-full justify-center">
    <main  class="w-full pt-1 px-3">
     
      <Switch>
        <PrivateRoute exact path="/dashboard/seller" component={DashboardSeller} />
        <PrivateRoute exact path="/user-experience-bookings" component={BookingsComponent} />
        <PrivateRoute exact path="/experiences/new" component={NewExperiences} />
        <PrivateRoute exact path="/experience/edit/:expId" component={EditExperience} />
        
      </Switch>
    </main>
    </div>
  </div>
  </HashRouter>
</div> 
 </>

  );
};

export default Dashboard;
