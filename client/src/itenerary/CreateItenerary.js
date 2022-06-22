import React, { useEffect, useState } from "react";
import IteneraryForm from "./IteneraryForm";
import { useSelector } from "react-redux";
import moment from "moment";
import { getDatesInRange } from "../components/shared/Utils";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

const CreateItenerary = ({ match }) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const experience = useSelector((state) => state.experiences.singleExperience);
  const [dateArray, setDateArray] = useState([]);
  const [selectedDate, setSelectedDate] = useState("")
  const formatStartDate = new Date(
    moment(experience.startDate).format("YYYY-MM-DD")
  );
  const formatEndDate = new Date(
    moment(experience.endDate).format("YYYY-MM-DD")
  );
  const dates = getDatesInRange(formatStartDate, formatEndDate);

  useEffect(() => {
    setDateArray(dates);
  }, []);

  const objIndex = dateArray.findIndex((obj => obj.date == formatStartDate.toString()));
//   dateArray[objIndex].people = [{name: "2", age: 3}]
  console.log(dateArray[objIndex]);

  return (
    <main className="max-w-full mx-auto shadow-xs bg-white rounded-md p-3 mt-2">
      <div className="grid grid-cols-1 mb-5">
        <div className="flex flex-col">
          <p className="text-2xl text-orange-500 mb-2">{experience.title} </p>
          <p className="text-lg text-gray-700">
            {experience.location}{" "}
            <span className="hover:bg-gray-300 delay-100 duration-100 bg-gray-200 rounded-sm py-1 px-3 text-xs">
              {moment(new Date(experience.startDate)).format("Do MMMM")} -{" "}
              {moment(new Date(experience.endDate)).format("Do MMMM")}
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1">

      <div className="w-full rounded-md bg-white">
          {dateArray && dateArray.map((d) => (
        <Disclosure key={d.date}>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-sm text-left text-sm font-medium text-gray-900 ">
              <span>{d.date.toString()}</span>
              <ChevronUpIcon
                className={`${
                  open ? 'rotate-180 transform' : ''
                } h-5 w-5 text-gray-900`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="pt-2 pb-2 text-sm text-gray-500">
              If you're unhappy with your purchase for any reason, email us
              within 90 days and we'll refund you in full, no questions asked.
            </Disclosure.Panel>
            <hr />
          </>
        )}
      </Disclosure>
          ))}

      </div>
    </div>

      {/* SAVE BUTTON */}
      <div className="grid grid-cols-1 mt-3 ">
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
              Save
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateItenerary;
