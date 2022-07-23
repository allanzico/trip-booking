import axios from "axios";

export const getChats = async ( token, cancelToken) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/get-chats`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cancelToken: cancelToken,
    }
  );
};

export const createChat = async (token, data) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/chat`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
