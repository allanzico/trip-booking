import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { BellIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { getSender } from "../shared/Utils";
import {
  currentChatSet,
  fetchNotifications,
} from "../../Redux/reducers/messaging";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NotificationsComponent = () => {
  const notifications = useSelector((state) => state.messaging.notifications);
  const { auth } = useSelector((state) => ({ ...state }));
  const user = auth === undefined ? null : auth?.user;
  const dispatch = useDispatch();

  const handleSetCurrentChat = (chat, notificationId) => {
    dispatch(
      fetchNotifications(notifications.filter((n) => n._id !== notificationId))
    );
    dispatch(currentChatSet(chat));
  };

  return (
    <Menu as="div" className="relative inline-block text-left px-3">
      <div>
        <Menu.Button className=" relative bg-gray-700 p-1 rounded-full text-white hover:text-white focus:outline-none">
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
          {notifications.length > 0 && ( <span class="absolute inset-4 object-right-bottom -mr-6">
    <div class="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-orange-500 text-white">
     {notifications.length}
    </div>
  </span>)}

        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {notifications?.length > 0 ? (
              notifications?.map((notification) => (
                <Menu.Item
                  key={notification._id}
                  onClick={() =>
                    handleSetCurrentChat(notification.chat, notification._id)
                  }
                >
                  {({ active }) => (
                    <Link to="/messaging">
                      <p
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-2 py-2 text-sm"
                        )}
                      >
                        New message from{" "}
                        {getSender(notification.chat.members, user).firstName}
                      </p>
                    </Link>
                  )}
                </Menu.Item>
              ))
            ) : (
              <Menu.Item >
                {({ active }) => (
                  <p className="text-gray-400 px-2 py-2 text-xs">
                    Looks like you are all caught up!
                  </p>
                )}
              </Menu.Item>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default NotificationsComponent;
