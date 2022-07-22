import React from "react";
import { format } from "timeago.js";
const MessagesComponent = ({
  message,
  own,
}) => {
  return (
    <>
      <div class="w-full h-full flex flex-col"></div>
      {/* Messages start */}

      {
        !own ? (
          /* Left Messages start */
          <div className="flex justify-start">
           <div className="w-14 mr-5">
              <img
                className="rounded-full w-full mr-2"
                src="https://i.pravatar.cc/300?img=3"
              />
            </div> 
            <div className="flex flex-col space-y-5 text-left">
              <div>
                <span className="bg-gray-100 text-gray-900 p-3 text-base rounded-r-lg rounded-b-lg inline flex max-w-xl">
                  {message.content}
                </span>
                <span className="text-gray-500 p-1 text-xs inline flex max-w-xl">
                  {format(message.createdAt)}
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Left Messages end */

          /* Right Messages Start */

          <div className="flex justify-end">
            <div className="flex flex-col space-y-5 text-right">
              <div>
                <span className="bg-orange-500 text-white p-3 text-base rounded-l-lg inline-block max-w-xl">
                  {message.content}
                </span>
                <span className="text-gray-500 p-1 text-xs inline flex max-w-xl">
                  {format(message.createdAt)}
                </span>
              </div>
            </div>
          </div>
        )

        /* Right Messages end */
      }

      {/* Messages End */}
    </>
  );
};

export default MessagesComponent;
