import { TrashIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import Tasks from "./Tasks";

const IteneraryCheckList = ({ section, checkList, removeChecklist }) => {
  return (
    <>
      {checkList && (
        <div className="grid grid-cols-6">
          <div className="col-span-5">
            <div className="flex flex-col mb-2 px-2 py-4 h-45 w-full bg-gray-100 rounded-md">
              <input
                defaultValue={checkList.desc}
                class="appearance-none block w-full bg-gray-100 text-lg text-gray-500 rounded-sm mb-2 py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border focus:border-gray-100"
                type="text"
                placeholder="Add title"
              />
              <Tasks checklist={checkList} />
            </div>
          </div>
          <div className="col-span-1 px-2">
              <button onClick={(e) => removeChecklist(e,section, checkList.id)}>
                <TrashIcon className="h-6 w-6" />
              </button>
            </div>
        </div>
      )}
    </>
  );
};

export default IteneraryCheckList;
