import React from "react";
import {  LocationMarkerIcon, XIcon } from "@heroicons/react/solid";

const Places = ({ location, section, removeLocation }) => {
 
  return (
    <>
      {location && (
        <div className="grid grid-cols-6">
          <div className="col-span-5">
            <div class="w-full pl-4">
              <div class="relative flex flex-col justify-center py-3 px-2 bg-gray-100 text-gray-700 rounded-md leading-tight rounded-sm">
                 <LocationMarkerIcon className="absolute -left-5 h-12 w-12 py-2  rounded-full text-md text-center" />

                <p className="text-md px-3 text-gray-700">
                  {location.locationName.toString()}
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-1 px-2">
            <button
              onClick={(e) => removeLocation(e, section, location.id)}
              className="p-2 rounded-md text-sm text-gray-900 hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Places;
