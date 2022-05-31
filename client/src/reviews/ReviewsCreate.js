import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reviewExperience } from "../actions/experience";


const ReviewsCreate = ({ expId }) => {
  const {
    auth: { user, token },
  } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState({
    rating: 0,
    comment: "",
  });
  const { rating, comment } = values;

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      let reviewData = new FormData();
      reviewData.append("rating", rating);
      reviewData.append("comment", comment);

      await reviewExperience(token, expId, reviewData);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (evt) => {
    setValues({
      ...values,
      [evt.target.name]: evt.target.value,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div class="shadow-sm overflow-hidden">
          <div class="px-4 py-5 bg-white sm:p-6">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-6 lg:col-span-3">
           <select
                  value={rating}
                  onChange={handleChange}
                  name="rating"
                  class="form-select form-select-md mb-3
                    appearance-none
                    block
                    w-1/2
                    px-4
                    py-2
                    text-l
                    font-normal
                    text-gray-900
                    bg-white bg-clip-padding bg-no-repeat
                    border border-solid border-gray-300
                    rounded-sm
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                >
                  <option value="" onChange={handleChange}>
                    rating...
                  </option>
                  <option value="1" onChange={handleChange}>
                    1-Poor
                  </option>
                  <option value="2" onChange={handleChange}>
                    2-Fair
                  </option>
                  <option value="3" onChange={handleChange}>
                    3-Good
                  </option>
                  <option value="4" onChange={handleChange}>
                    4-Very Good
                  </option>
                  <option value="5" onChange={handleChange}>
                    5-Excellent
                  </option>
                </select>
              </div>
              <div class="col-span-6">
                {/* Message  */}
                <div class="mb-2">
                  <textarea
                    type="text"
                    name="comment"
                    value={comment}
                    onChange={handleChange}
                    placeholder="description"
                    className="
                    w-full
                    rounded-sm
                    py-4
                    px-[14px]
                    border border-gray
                    outline-none
                    hover:outline-orange-500
                    hover:outline-1
                    focus-visible:shadow-none
                    focus:border-primary
                    "
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <div className="cursor-pointer">
              <button
                type="submit"
                className="
                text-white
                bg-orange-500
                rounded-sm
                px-5
                py-2
                transition
                hover:bg-orange-700
                uppercase
                "
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReviewsCreate;
