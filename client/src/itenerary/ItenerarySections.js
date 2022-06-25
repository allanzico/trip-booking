import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import moment from "moment";
import IteneraryCheckList from "./checklists/IteneraryCheckList";
import { v4 as uuidv4 } from 'uuid';

const ItenerarySections = ({ sections, setSections }) => {


  const addNewChecklist = (sectionId) => {
    let newCheckList = {
      id: uuidv4(),
      desc: "new Task",
      editting: false,
      tasks: []
    };

    let sectionIndex = sections.findIndex(
      section => section.date === sectionId
    );
    let sectionToUpdate = sections[sectionIndex];

    sectionToUpdate.checkLists = [...sectionToUpdate.checkLists, newCheckList];

    setSections([...sections]);
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
                        <button onClick={() => addNewChecklist(section.date)} className="bg-gray-900 text-white mb-4">Add checklist</button>
                      {/* <input value={title} onChange={(e) => setTitle(e.target.value) } class="appearance-none block w-full md:w-1/2 bg-gray-50 text-gray-700 rounded-sm mb-2 py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border focus:border-gray-100" type="text" placeholder="add title" />
                        <IteneraryForm /> */}
                        <IteneraryCheckList section={section}/>
                      </div>
                      If you're unhappy with your purchase for any reason, email
                      us within 90 days and we'll refund you in full, no
                      questions asked.
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
