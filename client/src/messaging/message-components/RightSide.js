import React from "react";
import { MdSend } from "react-icons/md";

const RightSide = () => {
  const handleSubmit = () => {};
  return (
    <>
      <div class="w-full h-screen flex flex-col">
        <div class="h-20 border-b flex justify-between items-center w-full px-5 py-2 shadow-sm">
          <div class="flex items-center">
            <img
              class="h-10 w-10 overflow-hidden rounded-full"
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500"
              alt=""
            />
            <p class="font-semibold ml-3 text-slate-600">Mircel Jones</p>
          </div>

          {/* Nav button */}
          <div class="flex items-center space-x-5">
            <button class="p-2 text-gray-700 flex self-center rounded-full md:hidden focus:outline-none hover:text-gray-600 hover:bg-gray-200">
              <svg
                class="w-6 h-6 text-gray-600 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="nonzero"
                  d="M4,16 L20,16 C20.5522847,16 21,16.4477153 21,17 C21,17.5128358 20.6139598,17.9355072 20.1166211,17.9932723 L20,18 L4,18 C3.44771525,18 3,17.5522847 3,17 C3,16.4871642 3.38604019,16.0644928 3.88337887,16.0067277 L4,16 L20,16 L4,16 Z M4,11 L20,11 C20.5522847,11 21,11.4477153 21,12 C21,12.5128358 20.6139598,12.9355072 20.1166211,12.9932723 L20,13 L4,13 C3.44771525,13 3,12.5522847 3,12 C3,11.4871642 3.38604019,11.0644928 3.88337887,11.0067277 L4,11 Z M4,6 L20,6 C20.5522847,6 21,6.44771525 21,7 C21,7.51283584 20.6139598,7.93550716 20.1166211,7.99327227 L20,8 L4,8 C3.44771525,8 3,7.55228475 3,7 C3,6.48716416 3.38604019,6.06449284 3.88337887,6.00672773 L4,6 Z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="h-full px-10 py-4">
          {/* message container */}
          <div class="text-center my-5">
            <div class="flex items-center">
              <div class="flex-grow bg bg-gray-200 ">
                <hr class="-mb-3" />
              </div>
              <div class="flex-grow-0 mx-3 text dark:text-white">
                <span class="text-xs text-slate-300 font-medium bg-white">
                  Wednesday, 2:15 AM
                </span>
              </div>
              <div class="flex-grow bg bg-gray-200 ">
                <hr class="-mb-3" />
              </div>
            </div>
          </div>

          {/* messages */}
          <div class="w-full flex flex-start">
            <div class="w-full md:w-1/2">
              <div class="flex items-center">
                <img
                  class="h-5 w-5 overflow-hidden rounded-full"
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500"
                  alt=""
                />
                <p class="font-semibold ml-3 text-sm text-slate-600">
                  Mircel Jones{" "}
                  <span class="text-slate-400 text-xs">3:21 PM</span>
                </p>
              </div>

              <div class="mt-3 w-full bg-slate-50 p-4 rounded-b-xl rounded-tr-xl">
                <p class=" text-sm text-slate-500">
                  Hey all, There are many variation of passages of Lorem ipsum
                  avaliable, but the jority have alternation in some form , by
                  injected humor, or randomise words which don't look even
                  slightly believable.
                </p>
              </div>
            </div>
          </div>

          {/* Me */}
          <div class="w-full flex justify-end mt-3">
            <div class="w-full md:w-1/2">
              <div class="flex items-center justify-end">
                <p class="font-semibold mr-3 text-sm text-slate-600">
                  Me <span class="text-slate-400 text-xs">3:25 PM</span>
                </p>

                <img
                  class="h-5 w-5 overflow-hidden rounded-full"
                  src="https://source.unsplash.com/random/500x500/?face"
                  alt=""
                />
              </div>

              <div class="mt-3 w-full bg-blue-500 p-4 rounded-b-xl rounded-tl-xl">
                <p class=" text-sm text-white">
                  Hey, we are own hidden lake forest which is netural lake are
                  generaly found in mountain.
                </p>
              </div>
            </div>
          </div>
          <div class="text-center my-5">
            <div class="flex items-center">
              <div class="flex-grow bg bg-gray-200 ">
                <hr class="-mb-3" />
              </div>
              <div class="flex-grow-0 mx-3 text dark:text-white">
                <span class="text-xs text-slate-300 font-medium bg-white">
                  Today, 2:15 AM
                </span>
              </div>
              <div class="flex-grow bg bg-gray-200 ">
                <hr class="-mb-3" />
              </div>
            </div>
          </div>

          {/* messages */}
          <div class="w-full flex flex-start">
            <div class="w-1/2">
              <div class="flex items-center">
                <img
                  class="h-5 w-5 overflow-hidden rounded-full"
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500"
                  alt=""
                />
                <p class="font-semibold ml-3 text-sm text-slate-600">
                  Mircel Jones{" "}
                  <span class="text-slate-400 text-xs">3:21 PM</span>
                </p>
              </div>

              <div class="mt-3  bg-slate-50 p-4 rounded-b-xl rounded-tr-xl">
                <p class=" text-sm text-slate-500">ok, Thanks</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-row items-center">
          <input
            class="flex flex-row mx-2 my-3 px-5 items-center w-full border rounded-full h-12"
            placeholder="Type here...."
          />
          <div class="flex items-center px-2">
            <button
              onClick={handleSubmit}
              className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-orange-500 hover:bg-orange-700 focus:outline-none"
            >
              <MdSend />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSide;
