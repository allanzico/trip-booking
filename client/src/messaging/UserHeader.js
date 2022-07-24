import React, { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getUserById } from "../actions/auth";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Disclosure } from "@headlessui/react";
import ConversationComponent from "./ConversationComponent";

const UserHeader = ({ conversations, currentUser, currentChat }) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;

  const source = axios.CancelToken.source();

  const getUser = async (userId) => {
    try {
      await getUserById(userId, token, source.token);
    
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const friendId =
      currentChat &&
      currentChat.members.find((member) => member !== currentUser._id);
    getUser(friendId);

    return () => {
      source.cancel();
    };
  }, [currentChat]);

  return (
  

<>

<header className="sticky top-0 z-50 border-b border-1 border-gray-100">
  <Disclosure as="nav" className="bg-white">
    {({ open }) => (
      <>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            <div className="-mr-2 flex md:hidden">

              {/* Mobile menu button */}
              <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-full hover:text-gray-600 hover:bg-gray-200 ">
                <span className="sr-only">Open menu</span>
                {open ? (
                  <XIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <MenuIcon
                    className="block h-6 w-6"
                    aria-hidden="true"
                  />
                )}
              </Disclosure.Button>
            </div>
          </div>
        </div>

        <Disclosure.Panel className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {conversations.map((conversation) => (
                      <div
                        key={conversation._id}
                        // onClick={() => setCurrentReceiver(conversation)}
                      >
                        <ConversationComponent
                          conversations={conversation}
                          currentUser={currentUser}
                        />
                      </div>
                    ))}
          </div>
        </Disclosure.Panel>
      </>
    )}
  </Disclosure>
</header>

</>




//     <div class="h-16 border-b flex justify-between items-center w-full px-3 py-2">
//       {currentChat && (
//         <div class="flex items-center">
//           <img
//             class="h-10 w-10 overflow-hidden rounded-full"
//             src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500"
//             alt=""
//           />
//           <p class="font-semibold ml-3 text-slate-600">{user && user.name}</p>
//         </div>
//       )}

//       <div class="flex items-center space-x-5">
//         {/* <button class="p-2 text-gray-700 flex self-center rounded-full md:hidden focus:outline-none hover:text-gray-600 hover:bg-gray-200">
//           <MenuIcon className="h-6 w-6 md:hidden cursor-pointer" />
//         </button> */}
//                             <div className="-mr-2 flex md:hidden">
// </div>
//       </div>
//     </div>
  );
};

export default UserHeader;
