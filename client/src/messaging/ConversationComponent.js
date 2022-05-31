import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../actions/auth";
import { fetchUser } from "../Redux/reducers/users";
import axios from "axios";

const ConversationComponent = ({ conversations, currentUser, messages }) => {
  //const user = useSelector((state) => state.user.user);
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const [user, setUser] = useState(null);
  const [recentMessage, setRecentMessage] = useState("");
  const dispatch = useDispatch();
  const source = axios.CancelToken.source();

  const getUser = async (userId) => {
    try {
      let res = await getUserById(userId, token, source.token);
      // dispatch(fetchUser(res.data))
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const friendId = conversations.members.find(
      (member) => member !== currentUser._id
    );

    getUser(friendId);

    return () => {
      source.cancel();
    };
  }, [currentUser, conversations]);

  // useEffect(() => {
  //   const mostRecentDate = new Date(Math.max(...messages.map(e => new Date(e.createdAt))))
    
  //   var mostRecentObject = messages.filter( e => { 
  //     var d = new Date( e.createdAt ); 
  //     console.log(e)
  //     return d.getTime() == mostRecentDate.getTime();
  // })[0]
  // // setRecentMessage(mostRecentObject)
  // return () => {
  //   source.cancel();
  // };
  // }, [])
  
  return (
 
    <div className="flex py-3 px-3 cursor-pointer hover:bg-gray-100 rounded-md mx-3 transition duration-200 ease-out">
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
            {user && user.name}
          </div>
          <div className="text-gray-700 text-xs">17:30</div>
        </div>
        <div className="text-gray-400 text-sm ">How are You?</div>
      </div>
    </div>
  );
};

export default ConversationComponent;
