import { ChevronDoubleLeftIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import moment from "moment";
import LocationComponent from "./LocationComponent";
import ChecklistComponent from "./ChecklistComponent";
import NotesComponent from "./NotesComponent";

const IteneraryComponent = ({ history }) => {
  const [itenerary, setItenerary] = useState([]);

  useEffect(() => {
    setItenerary(history.location.state);
  }, [history]);

  const goBack = () => {
    history.goBack();
  };

  function getComponents(myHashMap) {
    let comps = [];
    Object.values(myHashMap).forEach((value) => {
      if (value.type === "location") {
        comps.push(<LocationComponent location={value} />);
      }
      if (value.type === "notes") {
        comps.push(<NotesComponent notes={value} />);
      }
      if (value.type === "checklist") {
        comps.push(<ChecklistComponent checklist={value} />);
      }
    });
    return comps;
  }
  return (
    <div className="bg-white flex flex-col gap-2">
      <div className="flex flex-row gap-2 px-5 pt-5 pb-3">
        <button
          onClick={goBack}
          className="flex items-center text-orange-500 cursor-pointer"
        >
          <ChevronDoubleLeftIcon className="h-4 w-4" />
          <span className="px-2">Back to your booking</span>
        </button>
      </div>
      <div class="w-full px-5">
        <ol class="relative border-l border-gray-200 dark:border-gray-700">
          {itenerary &&
            itenerary.map((item) => (
              <li class="mb-10 ml-4" key={item.date}>
                <div class="absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time class="text-lg font-semibold text-gray-900 dark:text-white">
                  {moment(item.date).format("dddd, Do MMMM")}
                </time>
                {/* <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3> */}
                <p class="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">
                  {item.data ? (
                    getComponents(item.data)
                  ) : (
                    <p className="text-gray-700 text-sm">
                      {" "}
                      No Itenerary from host
                    </p>
                  )}
                </p>
              </li>
            ))}
        </ol>
      </div>
       {/* Print pdf BUTTON */}
       <div className="grid grid-cols-1 mt-3 ">
        <div class="py-3 bg-gray-50 text-right">
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
              Print PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IteneraryComponent;
