import React, { useState, Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import BackgroundLetterAvatars from "../shared/ProfileAvatar";

const ResponsiveNav = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const userName = auth?.user.firstName + " " + auth?.user.lastName
  const user = {
    name: userName,
    email: auth?.user.email,
    imageUrl: "",
  };

  const navigation = [
    ...(auth
      ? [
          { name: "Home", to: "/", current: false },
          { name: "Experiences", to: "/experiences", current: false },
          { name: "Dashboard", to: "/dashboard", current: false },
        ]
      : [
          { name: "Home", to: "/", current: false },
          { name: "Experiences", to: "/experiences", current: false },
        ]),
  ];

  const authNavigation = [
    { name: "Login", to: "/login", current: false },
    { name: "Register", to: "/register", current: false },
  ];

  const userNavigation = [
    { name: "Your Profile", to: "/edit-profile" },
    { name: "Messages", to: "/messaging", current: false },
    {
      name: "Sign out",
      href: "#",
      logout() {
        dispatch({
          type: "LOGOUT",
          payload: null,
        });
        window.localStorage.removeItem("auth");
        history.push("/login");
      },
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-1 border-gray-100">
        <Disclosure as="nav" className="bg-white">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Android_O_Preview_Logo.png"
                        alt=""
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.to}
                            // activeStyle={{ color: "#F97316" }}
                            className={classNames(
                              item.current
                                ? "bg-orange-900 text-white"
                                : "text-gray-900 hover:bg-orange-500 hover:text-white",
                              "px-3 py-2 rounded-sm text-sm font-medium"
                            )}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {auth === null &&
                          authNavigation.map((item) => (
                            <Link key={item.name} to={item.to}>
                              <button
                                type="button"
                                class="text-white bg-orange-500 font-medium rounded-sm text-sm px-3 py-2.5 text-center mr-1"
                              >
                                {item.name}
                              </button>
                            </Link>
                          ))}
                      </div>
                      {auth && auth.user?.role === "buyer" && (
                        <Link to="/register-company">
                          <button
                            type="submit"
                            className="
                              text-white
                              bg-orange-500
                              rounded-sm
                              px-2
                              py-2
                              transition
                              hover:bg-orange-700
                              mr-5
                              "
                          >
                            Register Merchant Account
                          </button>
                        </Link>
                      )}
                      {auth && (
                        <button
                          type="button"
                          className="bg-orange-500 p-1 rounded-full text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-orange-800 focus:ring-white"
                        >
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-4 w-4" aria-hidden="true" />
                        </button>
                      )}

                      {/* Profile dropdown */}
                      {auth && (
                        <Menu as="div" className="ml-3 relative z-50">
                          <div>
                            <Menu.Button className="max-w-xs bg-orange-500 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-orange-500 focus:ring-white">
                              <span className="sr-only">Open user menu</span>
                              {user.imageUrl ? (
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={user.imageUrl}
                                  alt=""
                                />
                              ) : (
                                <BackgroundLetterAvatars userName={user.name} />
                              )}
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
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <Link
                                      to={item.to}
                                      onClick={
                                        item.name == "Sign out"
                                          ? item.logout
                                          : null
                                      }
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      {item.name}
                                    </Link>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      )}
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-orange-500 inline-flex items-center justify-center p-2 rounded-sm text-white hover:text-white hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-orange-500 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
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
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className={classNames(
                        item.current
                          ? "bg-orange-900 text-white"
                          : "hover:bg-orange-700 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      <Disclosure.Button>{item.name}</Disclosure.Button>
                    </Link>
                  ))}
                </div>

                {auth && (
                  <div className="pt-4 pb-3 border-t border-orange-700">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        {user.imageUrl ? (
                          <img
                            className="h-10 w-10 rounded-full"
                            src={user.imageUrl}
                            alt=""
                          />
                        ) : (
                          <BackgroundLetterAvatars userName={user.name} />
                        )}
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none">
                          {user.name}
                        </div>
                        <div className="text-sm font-medium leading-none">
                          {user.email}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="ml-auto bg-orange-700 p-1 rounded-full text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-orange-800 focus:ring-white"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-3 px-2 space-y-1">
                      {userNavigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.to}
                          onClick={
                            item.name == "Sign out" ? (
                              item.logout
                            ) : (
                              <Link to={item.to} />
                            )
                          }
                        >
                          <Disclosure.Button className="block px-3 py-2 rounded-md text-base font-medium hover:text-white hover:bg-orange-700">
                            {item.name}
                          </Disclosure.Button>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-3 px-2 space-y-1">
                    {auth && auth.user?.role === "buyer" && (
                        <Link to="/register-company">
                          <button
                            type="submit"
                            className="
                              text-white
                              bg-orange-500
                              rounded-sm
                              px-2
                              py-2
                              transition
                              hover:bg-orange-700
                              mr-5
                              "
                          >
                            Register Merchant Account
                          </button>
                        </Link>
                      )}
                      </div>
                  </div>
                )}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </header>
    </>
  );
};

export default ResponsiveNav;
