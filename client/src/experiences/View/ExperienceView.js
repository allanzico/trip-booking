import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  diffDays,
  getSingleExperience,
  isAlreadyBooked,
} from "../../actions/experience";
import { currencyFormatter, getSessionId } from "../../actions/stripe";
import { loadStripe } from "@stripe/stripe-js";
import { StarIcon } from "@heroicons/react/solid";
import { RadioGroup } from "@headlessui/react";
import ReviewsView from "../../reviews/ReviewsView";
import ReviewsCreate from "../../reviews/ReviewsCreate";
import axios from "axios";
import { fetchSingleExperience } from "../../Redux/reducers/experiences";

const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Lorem ipsum dolor sit am",
    "Lorem ipsum dolor sit a",
    "Lorem ipsum dolor sit",
    "Lorem ipsum dolor si",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ExperienceView = ({ match, history }) => {
  const experience = useSelector((state) => state.experiences.singleExperience);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [alreadyBooked, setAlreadyBooked] = useState(false);
  const [isOwner, setIsOwner] = useState(history.location.state.isOwner);
  const [ratingAverage, setRatingAverage] = useState(0);
  const source = axios.CancelToken.source();
  const { auth } = useSelector((state) => ({ ...state }));
  const user = auth === undefined ? null : auth?.user;
  const dispatch = useDispatch()
  
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
      dispatch(fetchSingleExperience(res.data))
      setImage(`${process.env.REACT_APP_API}/experience/image/${res.data._id}`);
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
      let res = await getSessionId(auth.token, match.params.expId);
      const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
      stripe
        .redirectToCheckout({
          sessionId: res.data.sessionId,
        })
        .then((result) => console.log(result));
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
                    src={image}
                    alt="experience-image"
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-2">
                  <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt="experience-image"
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt="experience-image"
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                </div>
                <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
                  <img
                    src={image}
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
                      {experience.postedBy && experience.postedBy.name}{" "}
                    </a>
                  </h2>
                </div>

                {/* Options */}
                <div className="mt-4 lg:mt-0 lg:row-span-3">
                  <h2 className="sr-only">More information</h2>
                  <div className="flex justify-between items-center">
                    <p className="text-3xl font-bold text-orange-500">
                      {experience.price &&
                        currencyFormatter({
                          amount: experience.price * 100,
                          currency: "ugx",
                        })}
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
                          Available for{" "}
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
                        : alreadyBooked
                        ? "You already Booked this"
                        : isOwner
                        ? "You cant book your own"
                        : auth && auth.token
                        ? " Book Now"
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

                  <div className="mt-10">
                    <h3 className="text-sm font-medium text-gray-900">
                      Extra Perks
                    </h3>

                    <div className="mt-4">
                      <ul
                        role="list"
                        className="pl-4 list-disc text-sm space-y-2"
                      >
                        {product.highlights.map((highlight) => (
                          <li key={highlight} className="text-gray-400">
                            <span className="text-gray-600">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white pt-6 ">
            <div class="antialiased items-left  max-w-screen-md">
              <h3 class="mb-4 text-xl font-semibold text-gray-900">Reviews</h3>
              <div class="space-y-4">
                {user && experience.postedBy && user._id !== experience.postedBy._id && (<ReviewsCreate expId={experience._id} />)}
                {experience.reviews &&
                  experience.reviews.map((review) => (
                    <ReviewsView review={review} />
                  ))}

                {/* <div class="flex">
      <div class="flex-shrink-0 mr-3">
        <img class="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" alt="" />
      </div>
      <div class="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
        <strong>Sarah</strong> <span class="text-xs text-gray-400">3:34 PM</span>
        <p class="text-sm">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
          sed diam nonumy eirmod tempor invidunt ut labore et dolore
          magna aliquyam erat, sed diam voluptua.
        </p>
        
        <h4 class="my-5 uppercase tracking-wide text-gray-400 font-bold text-xs">Replies</h4>

        <div class="space-y-4">
          <div class="flex">
            <div class="flex-shrink-0 mr-3">
              <img class="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8" src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" alt="" />
            </div>
            <div class="flex-1 bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
              <strong>Sarah</strong> <span class="text-xs text-gray-400">3:34 PM</span>
              <p class="text-xs sm:text-sm">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                sed diam nonumy eirmod tempor invidunt ut labore et dolore
                magna aliquyam erat, sed diam voluptua.
              </p>
            </div>
          </div>
          <div class="flex">
            <div class="flex-shrink-0 mr-3">
              <img class="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8" src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" alt="" />
            </div>
            <div class="flex-1 bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
              <strong>Sarah</strong> <span class="text-xs text-gray-400">3:34 PM</span>
              <p class="text-xs sm:text-sm">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                sed diam nonumy eirmod tempor invidunt ut labore et dolore
                magna aliquyam erat, sed diam voluptua.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ExperienceView;
