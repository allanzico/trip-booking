import React from "react";
import { Link } from "react-router-dom";

const DashboardNav = () => {
  const activeTab = window.location.pathname;

  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link
          className={`nav-link ${activeTab === "/dashboard" && "active"}`}
          to="/dashboard"
        >
          Your bookings
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={`nav-link ${
            activeTab === "/dashboard/seller" && "active"
          }`}
          to="/dashboard/seller"
        >
          Your Listings
        </Link>
      </li>
    </ul>
  );
};

export default DashboardNav;
