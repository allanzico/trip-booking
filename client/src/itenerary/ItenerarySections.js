import React, { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, XIcon } from "@heroicons/react/outline";
import moment from "moment";
import IteneraryCheckList from "./checklists/IteneraryCheckList";
import { v4 as uuidv4 } from "uuid";
import GooglePlacesSearch from "../components/GooglePlacesSearch";
import { getLatLng, geocodeByAddress } from "react-places-autocomplete";

const ItenerarySections = ({
  sections,
  setSections,
}) => {
  const customStyle = {
    styles:
      "w-full rounded-sm py-2 pl-10 px-[14px] border border-gray outline-none",
  };

  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
    place: "",
  });
  const addNewChecklist = (sectionId) => {
    let newCheckList = {
      id: uuidv4(),
      desc: "new Task",
      editting: false,
      tasks: [],
      type:"checklist"
    };

    let sectionIndex = sections.findIndex(
      (section) => section.date === sectionId
    );
    let sectionToUpdate = sections[sectionIndex];

    sectionToUpdate.data.checkLists = [
      ...sectionToUpdate.data.checkLists,
      newCheckList,
    ];
    sectionToUpdate.test.set(new Date(), newCheckList)
    setSections([...sections]);
  };

  //select place
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    if (value) {
      setLocation({ lat: coordinates.lat, lng: coordinates.lng, place: value });
    }
  };

  //Add place

  const addNewLocation = (sectionId) => {
    if (address) {
      let newLocation = {
        id: uuidv4(),
        locationName: address,
        type: "location"
      };
      let sectionIndex = sections.findIndex(
        (section) => section.date === sectionId
      );
      let sectionToUpdate = sections[sectionIndex];

      sectionToUpdate.data.locations = [
        ...sectionToUpdate.data.locations,
        newLocation,
      ];

      sectionToUpdate.test.set(new Date(), newLocation)
      setSections([...sections]);
      setAddress("");

      const data = sections.map(section => (section.test))
      for(var i = 0; i++ < data[0].size; data[0].next())
    console.log( data[0].value())
    }

    
  };

  // useEffect(() => {
  //   if (address) {
  //     let newLocation = {
  //       id: uuidv4(),
  //       locationName: address,
  //     };
  //     setData({ ...data, locations: [...data.locations, newLocation] });
  //   }
  // }, [location]);

  const removeChecklist = (e, checklistId) => {
    e.preventDefault();
    // setSections((current) =>
    // current.filter((checklist) => {
    //   return checklist.id !== checklistId
    // }))
  };

  const removeLocation = (e, locationId, sectionId) => {
    e.preventDefault();
    let sectionIndex = sections.findIndex(
      (section) => section.date === sectionId
    );
    let sectionToUpdate = sections[sectionIndex];
    var lists = sectionToUpdate.data.locations.filter((x) => {
      return x.id !== locationId;
    });
    sectionToUpdate.data.locations = sectionToUpdate.data.locations.filter(
      (x) => {
        return x.id !== locationId;
      }
    );
    setSections([...sections]);
  };


  return (
    <>
      {sections &&
        sections.map((section) => (
          <Disclosure key={section.date}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full py-5 justify-between rounded-sm text-left text-lg font-medium text-gray-900 ">
                  <span>{moment(section.date).format("dddd, Do MMMM")}</span>
                  <ChevronDownIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-gray-900`}
                  />
                </Disclosure.Button>

                <Disclosure.Panel className="pb-2 text-sm text-gray-500">
                  <div className="flex flex-col">
                    <button
                      onClick={() => addNewChecklist(section.date)}
                      className="bg-gray-900 text-white mb-4"
                    >
                      Add checklist
                    </button>
                    <IteneraryCheckList
                      section={section}
                      removeChecklist={removeChecklist}
                    />
                    <div className="flex flex-col mb-4 gap-2">
                      {section.data.locations &&
                        Object.entries(section.data.locations).map(
                          ([key, value]) => (
                            <div className="grid grid-cols-6">
                              <div className="col-span-5">
                                <div class="w-full pl-4">
                                  <div class="relative flex flex-col justify-center py-3 px-2 bg-gray-100 text-gray-700 rounded-md leading-tight rounded-sm">
                                    <h3 class="absolute -left-5 w-8 py-2 bg-gray-900 text-white rounded-full text-md text-center">
                                      {key}
                                    </h3>
                                    <p className="text-md px-2 text-gray-700">
                                      {value.locationName.toString()}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-span-1 px-2">
                                <button
                                  onClick={(e) =>
                                    removeLocation(e, value.id, section.date)
                                  }
                                  className="p-2 rounded-md text-sm text-gray-900 hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out"
                                >
                                  <XIcon className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          )
                        )}
                    </div>

                    <div className="flex flex-row gap-2 ">
                      <div className="w-full">
                        <GooglePlacesSearch
                          customStyle={customStyle}
                          address={address}
                          setAddress={setAddress}
                          handleSelect={handleSelect}
                        />
                      </div>
                      <div className="cursor-pointer">
                        <button
                          onClick={() => addNewLocation(section.date)}
                          type="submit"
                          className="
                              text-white
                              
                              bg-orange-500
                              rounded-sm
                              px-2
                              py-2
                              transition
                              hover:bg-orange-700
                              uppercase
                              "
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                  If you're unhappy with your purchase for any reason, email us
                  within 90 days and we'll refund you in full, no questions
                  asked.
                </Disclosure.Panel>
                <hr />
              </>
            )}
          </Disclosure>
        ))}
    </>
  );
};

export default ItenerarySections;
