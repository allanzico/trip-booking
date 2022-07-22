import React, { useEffect, useRef, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { MdSend } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, sendMessage } from "../actions/messages";
import ConversationComponent from "./ConversationComponent";
import MessagesComponent from "./MessagesComponent";
import io from "socket.io-client";
import axios from "axios";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Disclosure } from "@headlessui/react";
import {useHistory} from "react-router-dom";
import { getChats } from "../actions/chat";
import toast from "react-hot-toast";
import { currentChatSet, fetchChats, fetchMessages, fetchNotifications, resetCurrentChat } from "../Redux/reducers/messaging";
let socket, selectedChatCompare

const Messaging = () => {

  // const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receiver, setReceiver] = useState(null)
  const scrollRef = useRef();
  const source = axios.CancelToken.source();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));
  const user = auth === undefined ? null : auth?.user;
  const token = auth === undefined ? null : auth?.token;
  const [chatMember, setChatMember] = useState(null);
  const [chats, setChats] = useState([]);
 const history = useHistory();
const [socketConnected, setSocketConnected] = useState(false);
const [notification, setNotification] = useState([]);
const currentChat = useSelector((state) => state.messaging.currentChat);

//Start Socket Client
  useEffect(() => {
    socket  = io(process.env.REACT_APP_SOCKET_IO_URL);
  }, []);


 useEffect(() => {
  setChatMember(user)
  dispatch(resetCurrentChat(null));
}, [history, user]);

  useEffect(() => {
    socket.emit("setup", user);
    socket.on("connection", () => setSocketConnected(true));
  }, [user]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    handleGetChats()
    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    handleGetMessages();
    selectedChatCompare = currentChat;
    
  }, [currentChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
        //send notification
        if(!notification.includes(newMessageReceived)) {
            setNotification([newMessageReceived,...notification])
            dispatch(fetchNotifications([newMessageReceived,...notification]));
        }
      }else {
        setMessages([...messages, newMessageReceived]);
      }
    })
  });

  const handleGetMessages = async () => {
    if(!currentChat) return;
    try {
      const res = await getMessages(currentChat._id, token);
      setMessages(res.data);
      socket.emit("join chat", currentChat._id);
    } catch (error) {
      console.log(error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = {
      content: newMessage,
      chatId: currentChat._id,
    };
    const refreshToast = null
    try {
      if (newMessage.trim() !== "" && newMessage) {
        setNewMessage("");
        const res = await sendMessage(token, msg);
        setMessages([...messages, res.data]);
        socket.emit("new message", res.data)
       }

    } catch (error) {
      console.log(error);
      toast.error("Error sending message", {
        id: refreshToast,
      });
    }
  };


  const handleGetChats = async () => {
    try {
      let res = await getChats(token, source.token);
      setChats(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSetCurrentChat = (chat) => {
    dispatch(currentChatSet(chat));
    
  };

  return (
    // <ResponsiveMessageComponent />

    <div className="bg-gray-100 dark:bg-gray-800">
      <div className="flex flex-1 overflow-hidden h-screen max-w-screen-2xl m-auto">
        <div className="p-12 lg:p-20 w-full">
          <div className="max-h-full h-full flex flex-row">
            <aside className="md:block hidden w-full lg:w-1/2 lg:w-26 bg-white rounded-lg mr-5">
              <div className="max-w-full h-full w-full flex flex-col">
                <div className="flex p-10 justify-between">
                  <div className="text-4xl font-semibold text-gray-900">
                    Chat
                  </div>
                </div>

                {/* User's section start */}

                <div className="flex-1 overflow-y-scroll scrollbar-width scrollbar-thumb-color dark:scrollbar-thumb-color-dark">
                  <div className="w-full">
                    {/* User Start */}

                    {chats && chats.map((chat) => (
                      <div
                        key={chat._id}
                        onClick={() => handleSetCurrentChat(chat)}
                      >
                        <ConversationComponent
                          conversations={chat}
                          currentUser={user}
                          messages={messages}
                          chatMember={chatMember}
                          userChat={chat}
                          currentChat={currentChat}
                        />
                      </div>
                    ))}

                    {/* User End */}
                  </div>
                </div>
              </div>
            </aside>
            <section className="relative max-h-full h-full bg-white rounded-lg w-full flex flex-col lg:flex">
              <header className="sticky top-0 border-b border-1 border-gray-100">
                <Disclosure as="nav" className="bg-white">
                  {({ open }) => (
                    <>
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                          {currentChat && (
                            <div class="flex items-center">
                              <img
                                class="h-10 w-10 overflow-hidden rounded-full"
                                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500"
                                alt=""
                              />
                              <p class="font-semibold ml-3 text-slate-600">
                                {receiver && receiver.name}
                              </p>
                            </div>
                          )}

                          <div className="-mr-2 flex md:hidden">
                            {/* Mobile menu button */}
                            <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-full hover:text-gray-600 hover:bg-gray-200 ">
                              <span className="sr-only">Open menu</span>
                              {open ? (
                                <XIcon
                                  className="block h-6 w-6"
                                  aria-hidden="true"
                                />
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

                        {chats && chats.map((chat) => (
                      <div
                        key={chat._id}
                        onClick={() => handleSetCurrentChat(chat)}
                      >
                        <ConversationComponent
                          conversations={chat}
                          currentUser={user}
                          messages={messages}
                          chatMember={chatMember}
                          userChat={chat}
                          currentChat={currentChat}
                        />
                      </div>
                    ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </header>

              <div className="flex-1 overflow-y-scroll p-5 scrollbar-thumb-color scrollbar-width space-y-5">
                {currentChat
                  ? messages.map((message, index) => (
                      <div ref={scrollRef} key={message._id}>
                        <MessagesComponent
                          message={message}
                          own={message.sender._id === user._id}
                        />
                      </div>
                    ))
                  : null}
              </div>

              {currentChat && (
                <div className="flex-none p-5">
                  <div className="relative flex">
                    <span className="absolute inset-y-0 flex-items-center">
                      <button className="inline-flex items-center justify-center rounded-sm h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                        <BsEmojiSmile />
                      </button>
                    </span>
                    <textarea
                      onChange={(e) => setNewMessage(e.target.value)}
                      type="text"
                      placeholder="Type here..."
                      rows="1"
                      value={newMessage}
                      className="
                    w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-400 pl-12 bg-gray-100  py-2 pr-5 
                    rounded-sm
                    border border-gray
                    outline-none
                    hover:outline-orange-500
                    hover:outline-1
                    focus-visible:shadow-none
                    focus:border-primary
                    "
                    />

                    <div className="ml-5">
                      <button
                        onClick={handleSubmit}
                        className="inline-flex items-center justify-center rounded-sm h-12 w-12 transition duration-500 ease-in-out text-white bg-orange-500 hover:bg-orange-700 focus:outline-none"
                      >
                        <MdSend />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messaging;
