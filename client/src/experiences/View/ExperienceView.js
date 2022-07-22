import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  diffDays,
  getSingleExperience,
  isAlreadyBooked,
} from "../../actions/experience";
import { currencyFormatter } from "../../actions/stripe";
import { StarIcon } from "@heroicons/react/solid";
import ReviewsView from "../../reviews/ReviewsView";
import axios from "axios";
import { fetchSingleExperience } from "../../Redux/reducers/experiences";
import { getHighestPrice, getLowestPrice } from "../../components/shared/Utils";


const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ExperienceView = ({ match, history }) => {
  const experience = useSelector((state) => state.experiences.singleExperience);
  const [loading, setLoading] = useState(false);
  const [alreadyBooked, setAlreadyBooked] = useState(false);
  const [isOwner, setIsOwner] = useState(history.location.state?.isOwner);
  const [ratingAverage, setRatingAverage] = useState(0);
  const source = axios.CancelToken.source();
  const { auth } = useSelector((state) => ({ ...state }));
  const user = auth === undefined ? null : auth?.user;
  const dispatch = useDispatch();

  useEffect(() => {
    loadSingleExperience();

    //calculate rating average
    if (experience.reviews) {
      const average =
        experience.reviews.reduce((prev, review) => prev + review.rating, 0) /
        experience.numReviews;
      setRatingAverage(average);
    }

    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    if (auth && auth.token) {
      isAlreadyBooked(auth.token, match.params.expId, source.token).then(
        (res) => {
          if (res.data.ok) setAlreadyBooked(true);
        }
      );
      //set is owner
    }
    return () => {
      source.cancel();
    };
  }, []);

  const loadSingleExperience = async () => {
    try {
      let res = await getSingleExperience(match.params.expId, source.token);
      dispatch(fetchSingleExperience(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!auth || !auth.token) {
      history.push("/login");
      return;
    }

    setLoading(true);
    try {
      if (!auth) history.push("/login");
      history.push({
        pathname: "/checkout",
        state: { experience: experience, user: user },
      });
      // let res = await getSessionId(auth.token, match.params.expId);
      // const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
      // stripe
      //   .redirectToCheckout({
      //     sessionId: res.data.sessionId,
      //   })
      //   .then((result) => console.log(result));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex-auto">
      <div className="overflow-hidden">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-4 lg:px-6 py-4">
          <div className="bg-white border-b">
            <div className="pt-6">
              <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                <div className="lg:col-span-2 lg:pr-8">
                  <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                    {experience.location}
                  </h1>
                </div>
              </div>
              {/* Image gallery */}
              <div className="mt-6 max-w-2xl mx-auto px-4 sm:px-4 lg:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-2">
                <div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
                  <img
                    src={
                      experience.files && experience.files[0]
                        ? experience.files[0]?.url
                        : "https://via.placeholder.com/1000x1000"
                    }
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-2">
                  <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                    <img
                      src={
                        experience.files && experience.files[1]
                          ? experience.files[1]?.url
                          : "https://via.placeholder.com/1000x500"
                      }
                      alt="experience-image"
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                    <img
                      src={
                        experience.files && experience.files[2]
                          ? experience.files[2]?.url
                          : "https://via.placeholder.com/1000x500"
                      }
                      alt="experience-image"
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                </div>
                <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
                  <img
                    src={
                      experience.files && experience.files[3]
                        ? experience.files[3]?.url
                        : "https://via.placeholder.com/1000x1000"
                    }
                    alt="experience-image"
                    className="w-full h-full object-center object-cover"
                  />
                </div>
              </div>

              {/* Product info */}
              <div className="max-w-2xl mx-auto pt-5 pb-5 px-4 sm:px-6 lg:max-w-7xl lg:pt-5 lg:pb-8 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                <div className="lg:col-span-2 lg:border-r flex justify-between items-center lg:border-gray-200 lg:pr-8">
                  <h2 className="text-2xl tracking-tight font-semibold text-gray-900 sm:text-3xl">
                    Hosted by{" "}
                    <a
                      href="#"
                      className="text-orange-500 hover:text-orange-700 hover:underline"
                    >
                      {" "}
                      {experience.postedBy &&
                        experience.postedBy.firstName}{" "}
                    </a>
                  </h2>
                </div>

                {/* Options */}
                <div className="mt-4 lg:mt-0 lg:row-span-3">
                  <h2 className="sr-only">More information</h2>
                  <div className="flex flex-col items-left">
                    <p className="text-xl font-bold text-orange-500">
                      <span>
                        {experience.tickets &&
                          currencyFormatter({
                            amount: getLowestPrice(experience.tickets) * 100,
                            currency: "ugx",
                          })}
                      </span>
                      -
                      <span>
                        {experience.tickets &&
                          currencyFormatter({
                            amount: getHighestPrice(experience.tickets) * 100,
                            currency: "ugx",
                          })}
                      </span>
                    </p>

                    {/* Reviews */}
                    <div>
                      <h3 className="sr-only">Reviews</h3>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={classNames(
                                ratingAverage > rating
                                  ? "text-gray-900"
                                  : "text-gray-200",
                                "h-5 w-5 flex-shrink-0"
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <p className="sr-only">
                          {reviews.average} out of 5 stars
                        </p>
                        <a
                          href="#"
                          className="ml-3 text-sm font-medium text-orange-500 hover:text-orange-700"
                        >
                          {experience.numReviews} reviews
                        </a>
                      </div>
                    </div>
                  </div>

                  <form className="mt-4">
                    {/* Available for */}
                    <div>
                      <h3 className="text-sm text-gray-900 font-medium">
                        <span class="hover:bg-gray-300 delay-100 duration-100 bg-gray-200 rounded-sm py-2 px-2 text-xs">
                          Experience lasts{" "}
                          {diffDays(experience.startDate, experience.endDate)}{" "}
                          {diffDays(experience.startDate, experience.endDate) ==
                          1
                            ? " day"
                            : " days"}
                        </span>
                      </h3>
                    </div>

                    {/* From To */}
                    <div className="mt-5 border-t border-b py-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm text-gray-900 font-medium">
                          From:{" "}
                          {moment(new Date(experience.startDate)).format(
                            "Do MMMM YYYY"
                          )}
                        </h3>
                        <h3 className="text-sm text-gray-900 font-medium">
                          To:{" "}
                          {moment(new Date(experience.endDate)).format(
                            "Do MMMM YYYY"
                          )}
                        </h3>
                      </div>
                    </div>

                    <button
                      onClick={handleClick}
                      className=" mt-5 w-full cursor-pointer bg-orange-500 rounded-sm py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={loading || alreadyBooked || isOwner}
                    >
                      {loading
                        ? "Loading..."
                        : isOwner
                        ? "You cant book your own"
                        : alreadyBooked
                        ? "You already Booked this"
                        : auth && auth.token
                        ? " View Tickets"
                        : "Login To Book"}
                    </button>
                  </form>
                </div>

                <div className="py-10  lg:pt-4 lg:pb-10 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-6">
                  {/* Description and details */}
                  <div>
                    <h3 className="sr-only">Description</h3>

                    <div className="space-y-4">
                      <p className="text-base text-gray-900">
                        {experience.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h3 className="text-sm font-medium text-gray-900">
                      Provided by the Host
                    </h3>
                        {experience.extraPerks.length > 0 ? (                    <div className="mt-2">
                      <ul
                        role="list"
                        className="pl-4 list-disc text-sm space-y-2"
                      >
                        {experience.extraPerks &&
                          experience.extraPerks.map((perk, index) => (
                            <li key={index} className="text-gray-400">
                              <span  className="text-gray-600">
                                {perk.perkName}
                              </span>
                            </li>
                          ))}
                      </ul>
                    </div>): <p className="text-xs text-gray-500 mt-2 ">This experience has no extra perks</p>}

                  </div>
                </div>
              </div>
            </div>
          </div>
          {experience.reviews && experience.reviews.length > 0 ? (
            <div className="bg-white pt-6 ">
              <div class="antialiased items-left  max-w-screen-md">
                <h3 class="mb-4 text-xl font-semibold text-gray-900">
                  Reviews
                </h3>
                <div class="space-y-4">
                  {experience.reviews &&
                    experience.reviews.map((review) => (
                      <ReviewsView review={review} />
                    ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default ExperienceView;
