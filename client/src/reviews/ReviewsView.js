import React from "react";
import { StarIcon } from "@heroicons/react/solid";
import moment from "moment";

const ReviewsView = ({ review }) => {

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div class="flex">
      <div class="flex-shrink-0 mr-3">
        <img
          class="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
          src="https://i.pravatar.cc/300?img=3"
          alt=""
        />
      </div>
      <div class="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900">
            {review.reviewedBy.firstName}
          </h3>

          {/* Reviews */}
          <div>
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      review.rating > rating
                        ? "text-orange-500"
                        : "text-orange-100",
                      "h-5 w-5 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <span class="text-xs text-gray-400">
          {" "}
          {moment(review.createdAt).format("MMMM YYYY")}
        </span>
        <p class="text-sm">{review.comment}</p>
      </div>
    </div>
  );
};

export default ReviewsView;
