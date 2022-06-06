import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  diffDays,
  getSingleExperience,
  isAlreadyBooked,
} from "../../actions/experience";
import { currencyFormatter, getSessionId } from "../../actions/stripe";
import PageTitle from "../../components/Typography/PageTitle";
import { loadStripe } from "@stripe/stripe-js";

const ViewExperience = ({ match, history }) => {
  const [experience, setExperience] = useState({});
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [alreadyBooked, setAlreadyBooked] = useState(false);

  const { auth } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    loadSellerExperience();
  }, []);

  useEffect(() => {
    if (auth && auth.token) {
      isAlreadyBooked(auth.token, match.params.expId).then((res) => {
        if (res.data.ok) setAlreadyBooked(true);
      });
    }
  }, []);

  const loadSellerExperience = async () => {
    let res = await getSingleExperience(match.params.expId);
    setExperience(res.data);
    setImage(`${process.env.REACT_APP_API}/experience/image/${res.data._id}`);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!auth || !auth.token) {
      history.push("/login");
      return;
    }

    setLoading(true);
    if (!auth) history.push("/login");
    let res = await getSessionId(auth.token, match.params.expId);
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
    stripe
      .redirectToCheckout({
        sessionId: res.data.sessionId,
      })
      .then((result) => console.log(result));
  };
  return (
    <>
      <div className="container flex-1 text-center">
        <PageTitle>{experience.title}</PageTitle>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <br />
            <img
              src={image}
              alt={experience.title}
              className="img img-fluid m-2"
            />
          </div>
          <div className="col-md-6">
            <br />
            <b>{experience.description}</b>
            <p className="alert alert-info mt-3">
              {experience.price &&
                currencyFormatter({
                  amount: experience.price * 100,
                  currency: "eur",
                })}
              <span class="font-normal text-gray-600 text-base">/person</span>
            </p>

            <div class="flex mt-2 item-center">
              <span class="hover:bg-gray-300 delay-100 duration-100 bg-gray-200 rounded-sm py-1 px-2 text-xs">
                Available for{" "}
                {diffDays(experience.startDate, experience.endDate)}{" "}
                {diffDays(experience.startDate, experience.endDate) == 1
                  ? " day"
                  : " days"}
              </span>
            </div>

            <p>
              From <br />{" "}
              {moment(new Date(experience.startDate)).format("Do MMMM YYYY")}
            </p>
            <p>
              To <br />{" "}
              {moment(new Date(experience.endDate)).format("Do MMMM YYYY")}
            </p>
            <i>Posted by {experience.postedBy && experience.postedBy.name}</i>
            <br />

            <button
              onClick={handleClick}
              className="btn btn-block btn-lg btn-primary mt-3"
              disabled={loading || alreadyBooked}
            >
              {loading
                ? "Loading..."
                : alreadyBooked
                ? "You already Booked this"
                : auth && auth.token
                ? " Book Now"
                : "Login To Book"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewExperience;
