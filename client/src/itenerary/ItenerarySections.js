import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import {
  ChevronDownIcon,
  ClipboardListIcon,
  DocumentIcon,
} from "@heroicons/react/outline";
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

  const addNewChecklist = (sectionId) => {
    let newCheckList = {
      id: uuidv4(),
      desc: "",
      editting: false,
      tasks: [],
      type: "checklist",
    };

    let sectionIndex = sections.findIndex(
      (section) => section.date === sectionId
    );
    let sectionToUpdate = sections[sectionIndex];

    sectionToUpdate.data.set(newCheckList.id, newCheckList);
    // sectionToUpdate.data[newCheckList.id] = newCheckList;
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

  //Add Notes
  const addNotes = (sectionId) => {
    let newNotes = {
      id: uuidv4(),
      description: "",
      type: "notes",
    };
    setData(sectionId, newNotes.id, newNotes);
  };

  function setData(sectionId, dataId, data) {
    let sectionIndex = sections.findIndex(
      (section) => section.date === sectionId
    );
    let sectionToUpdate = sections[sectionIndex];
    sectionToUpdate.data.set(dataId, data);
    setSections([...sections]);
  }

  function deleteData(e, section, dataId) {
    e.preventDefault();
    section.data.delete(dataId);
    setSections([...sections]);
  }
  
  function getComponents(myHashMap, section) {
    let comps = [];
    myHashMap.forEach((value, key) => {
      if (value.type === "location") {
        comps.push(
          <Places
            key={key}
            location={value}
            deleteData={deleteData}
            section={section}
          />
        );
      }
      if (value.type === "notes") {
        comps.push(
          <Notes section={section} notes={value} deleteData={deleteData} />
        );
      }
      if (value.type === "checklist") {
        comps.push(
          <IteneraryCheckList
            checkList={value}
            section={section}
            deleteData={deleteData}
          />
        );
      }
    });
    return comps;
  }


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
                    <div class="grid grid-cols-6 mb-4">
                      <div className="col-span-5">
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-2 ">
                          <div className="md:col-span-4">
                            <div className="flex flex-row items-center justify-end gap-2 ">
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
                          <div className="md:col-span-2">
                            <div class="w-full">
                              <div className="flex items-center justify-end gap-2">
                                <div className="cursor-pointer">
                                  <button
                                    onClick={() =>
                                      addNewChecklist(section.date)
                                    }
                                    type="submit"
                                    class="text-gray-900 uppercase gap-1 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-semibold rounded-sm text-xs px-3 py-2 text-center inline-flex items-center"
                                  >
                                    <ClipboardListIcon className="h-4 w-4 text-orange-500" />
                                    Checklist
                                  </button>
                                </div>
                                <div className="cursor-pointer">
                                  <button
                                    onClick={() => addNotes(section.date)}
                                    type="submit"
                                    class="text-gray-900 uppercase gap-1 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-semibold rounded-sm text-xs px-3 py-2 text-center inline-flex items-center"
                                  >
                                    <DocumentIcon className="h-4 w-4 text-orange-500" />
                                    Note
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mb-4 gap-2">
                      {getComponents(section.data, section)}
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
