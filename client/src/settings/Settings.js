import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import TwoFactorAuthSettings from "./2FA/TwoFactorAuthSettings";
import EditProfile from '../user/Edit/EditProfile'
import EditPassword from '../user/Edit/EditPassword'

const Settings = () => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  let [categories] = useState({
    // "General": [],
    "Profile": [],
    "Security": [],
    "Notifications": [],
  });

  return (
    <div className="w-full ">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-sm bg-gray-200 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-sm py-2.5 text-sm font-medium leading-5 text-orange-500",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-orange-500 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow-sm"
                    : "text-gray-900 hover:bg-white/[0.12] hover:text-orange-500"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {/* <Tab.Panel className="rounded-sm h-screen bg-white p-3">
            
            <main className="shadow-xs bg-white rounded-md">
          <div className="grid grid-cols-1 divide-y">
              <div className="col-span-6 mb-3">
              <TwoFactorAuthSettings/>
              </div>

               </div>
            
            </main>
          </Tab.Panel> */}

          <Tab.Panel className="rounded-sm h-screen bg-white p-3">
           
            <main className="shadow-xs bg-white rounded-md">
          <div className="grid grid-cols-1 divide-y">
              <div className="col-span-6 mb-3">
              <EditProfile />
              </div>

               </div>
            
            </main>
          </Tab.Panel>

          <Tab.Panel className="rounded-sm h-screen bg-white p-3">
          <main className="shadow-xs bg-white rounded-md">
          <div className="grid grid-cols-1 divide-y">
              <div className="col-span-6 mb-3">
              <EditPassword />
              </div>
              <div className="col-span-6 mt-3">
                  <TwoFactorAuthSettings />
              </div>
          
              
               </div>
            
            </main>
              
  
            
          </Tab.Panel>
          
          <Tab.Panel className="rounded-sm h-screen bg-white p-3">
          <main className="shadow-xs bg-white rounded-md">
          <div className="grid grid-cols-1 divide-y">
              <div className="col-span-6 mb-3">
              <TwoFactorAuthSettings />
              </div>
              <div className="col-span-6 mt-3 mb-3">
                  <TwoFactorAuthSettings />
              </div>
              <div className="col-span-6 mt-3 mb-3">
                  <TwoFactorAuthSettings />
              </div>
              <div className="col-span-6 mt-3 mb-3">
                  <TwoFactorAuthSettings />
              </div>
          
              
               </div>
            
            </main>
          </Tab.Panel>
        
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Settings;
