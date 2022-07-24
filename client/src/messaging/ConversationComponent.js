import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import axios from "axios";
import { getSender } from "../components/shared/Utils";

const ConversationComponent = ({
  userChat,

}) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const user = auth === undefined ? null : auth?.user;
  // const token = auth === undefined ? null : auth?.token;
  const source = axios.CancelToken.source();
  const [sender, setSender] = useState(null);

  useEffect(() => {
    const senderData = getSender(userChat.members, user);
    setSender(senderData);
    return () => {
      source.cancel();
    };
  }, [user]);

  //fetch all cchats by user
  return (
    <div
      className=
           "flex py-3 px-3 cursor-pointer hover:bg-gray-100 rounded-md mx-3 transition duration-200 ease-out"
      
    >
      <div className="mr-4 relative w-12">
        <img
          className="rounded-full w-full mr-2"
          src="https://i.pravatar.cc/300?img=3"
        />
        <div className="w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-0"></div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-center">
          <div className="text-gray-800 text-base font-semibold ">
            {sender && sender.firstName}
          </div>
          <div className="text-gray-700 text-xs">17:30</div>
        </div>
        <div className="text-gray-400 text-sm ">How are You?</div>
      </div>
    </div>
  );
};

export default ConversationComponent;
