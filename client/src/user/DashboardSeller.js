import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { HomeOutlined } from "@ant-design/icons";
import { createStripeAccount } from "../actions/stripe";
import { toast } from "react-toastify";
import { getSellerExperiences } from "../actions/experience";

import axios from "axios";

import { fetchSellerExperiences } from "../Redux/reducers/experiences";
import ListingsCard from "../Listings/ListingsCard";

const DashboardSeller = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const source = axios.CancelToken.source();
  //const [sellerExperiences, setSellerExperiences] = useState([]);
  const sellerExperiences = useSelector((state) => state.experiences.sellerExperiences);
  const dispatch = useDispatch();
  useEffect(() => {
    loadSellerExperiences();
    return () => {
      source.cancel();
    };
  }, );

  const loadSellerExperiences = async () => {
    let { data } = await getSellerExperiences(auth.token, source.token);
    dispatch(fetchSellerExperiences(data));
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      let res = await createStripeAccount(auth.token);
      window.location.href = res.data;
    } catch (error) {
      console.log(error);
      toast.error("stripe connection failed, try again");
      setLoading(false);
    }
  };

  
  const connectedSeller = () => {
    return (
   
      <main className="flex">
        <section className="flex-grow">
          <div className="hidden lg:inline-flex mb-3 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="filter-component-button">Button</p>
            <p className="filter-component-button">Another Button</p>
            <p className="filter-component-button">More Button</p>
            <p className="filter-component-button">Cool Button</p>
          </div>

          <div className="flex flex-col">
            <div className="grid grid-cols-1 mb-3">
              <div class="mb2 px-4 py-3 bg-gray-50 text-left sm:px-6">
                <div className="cursor-pointer">
                  <Link to="/experiences/new">
                    <button
                      type="submit"
                      className="
                          text-white
                          bg-orange-500
                          rounded-sm
                          px-4
                          py-2
                          transition
                          hover:bg-orange-700
                          uppercase
                          "
                    >
                      Add new
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            {sellerExperiences &&
              sellerExperiences.map((exp) => <ListingsCard exp={exp} />)}
          </div>
        </section>
      </main>
    );
  };

  const notConnectedSeller = () => {
    return (
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <div className="p-5 pointer">
              <HomeOutlined className="h1" />
              <h4>Connect with stripe to post events</h4>
              <p className="lead">
                MERN partners with stripe to transfer earnings with your bank
                account
              </p>
              <button
                disabled={loading}
                onClick={handleClick}
                className="btn btn-primary mb-3"
              >
                {loading ? "Processing" : "Setup Payouts"}
              </button>
              <p className="text-muted">
                You will be redirected to stripe to complete the onboarding
                process
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {auth && auth.user && auth.user.role === "seller"
        ? connectedSeller()
        : notConnectedSeller()}
    </>
  );
};

export default DashboardSeller;
