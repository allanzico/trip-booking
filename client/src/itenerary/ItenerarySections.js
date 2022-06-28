import React, { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, XIcon } from "@heroicons/react/outline";
import moment from "moment";
import IteneraryCheckList from "./checklists/IteneraryCheckList";
import { v4 as uuidv4 } from "uuid";
import GooglePlacesSearch from "../components/GooglePlacesSearch";
import { getLatLng, geocodeByAddress } from "react-places-autocomplete";
import Places from "./places/Places";
import Notes from "./notes/Notes";

const ItenerarySections = ({ sections, setSections }) => {
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
  const [map, setMap] = useState([]);

  const addNewChecklist = (sectionId) => {
    let newCheckList = {
      id: uuidv4(),
      desc: "new task...",
      editting: false,
      tasks: [],
      type: "checklist",
    };

    let sectionIndex = sections.findIndex(
      (section) => section.date === sectionId
    );
    let sectionToUpdate = sections[sectionIndex];

    sectionToUpdate.data.set(newCheckList.id, newCheckList);
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
        type: "location",
      };
      let sectionIndex = sections.findIndex(
        (section) => section.date === sectionId
      );
      let sectionToUpdate = sections[sectionIndex];

      sectionToUpdate.data.set(newLocation.id, newLocation);
      setSections([...sections]);
      setAddress("");
    }
  };

  function getComponents(myHashMap, section) {
    const comps = [];
    myHashMap.forEach((value, key) =>
      comps.push(
        value.type === "location" ? (
          <Places
            key={key}
            location={value}
            removeLocation={removeLocation}
            section={section}
          />
        ) : (
          <IteneraryCheckList
            checkList={value}
            section={section}
            removeChecklist={removeChecklist}
          />
        )
      )
    );
    return comps;
  }

  const removeChecklist = (e, section, checklistId) => {
    e.preventDefault();
    section.data.delete(checklistId);
    setSections([...sections]);
  };

  const removeLocation = (e, section, locationId) => {
    e.preventDefault();
    section.data.delete(locationId);
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

                    <div className="flex flex-col mb-4 gap-2">
                      {getComponents(section.data, section)}
                      <Notes />
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
