import React from "react";
import { currencyFormatter } from "../../actions/stripe";
import { diffDays } from "../../actions/experience";
import { Link, useHistory } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";

const HorizontalCard = ({
  exp,
  handleExperienceEdit = (func) => func,
  owner = false,
  showViewMore = true,
}) => {
  const history = useHistory();
  return (
    <div class="flex w-full overflow-hidden bg-white rounded-md shadow-md duration-300">
      <div class="w-1/3 bg-cover">
        {exp.image && exp.image.contentType ? (
          <img
            src={`${process.env.REACT_APP_API}/experience/image/${exp._id}`}
            alt="experiences-image"
            className="rounded-x-md h-full w-full object-cover"
          />
        ) : (
          <img
            src="https://via.placeholder.com/900x500.png?text=PREVIEW"
            alt="experiences-default-image"
            className="rounded-x-md h-full w-full object-cover"
          />
        )}
      </div>

      <div class="w-2/3 p-4 md:p-4">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">
          {exp.title}
        </h1>

        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {`${exp.description.substring(0, 100)}...`}
        </p>

        <div class="flex mt-2 item-center">
          <span class="hover:bg-gray-300 delay-100 duration-100 bg-gray-200 rounded-sm py-1 px-2 text-xs">
            {diffDays(exp.startDate, exp.endDate)}{" "}
            {diffDays(exp.startDate, exp.endDate) == 1 ? " day" : " days"} left 
          </span>
        </div>
        <p class="mt-2 ">
          Available Tickets: {exp.available}
        </p>
        <div class="flex justify-between mt-3 item-center">
        <p class="text-xl font-black text-orange-500">
          {currencyFormatter({ amount: exp.price * 100, currency: "eur" })}
          <span class="font-normal text-gray-600 text-base">/person</span>
        </p>

          {owner && (
            <>
              <Link
                className="flex text-xs border px-3 my-auto py-2 mr-2
                        border-orange-500 group hover:bg-orange-500 hover:text-white
                        rounded-xss
                        transition-all duration-200"
                to={`/experience/edit/${exp._id}`}
              >
                <EditOutlined
                  onClick={() => handleExperienceEdit(exp._id)}
                />
              </Link>
            </>
          )}


          {/* view Deal Button  */}
          {showViewMore && (
            <>
              <button
                type="submit"
                className="
              flex text-xs border px-3 my-auto py-2 mr-2
              border-orange-500 group hover:bg-orange-500 
              rounded-xs
              transition-all duration-200
              hover:text-white
                    "
                onClick={() => history.push(`/experience/${exp._id}`)}
              >
                View deal &gt;
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HorizontalCard;
