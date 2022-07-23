import axios from "axios";

export const getMessages = async (chatId, token) => {
    return await axios.get(`${process.env.REACT_APP_API}/get-messages/${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      } );
  };

  export const sendMessage = async (token, data) => {
    return await axios.post(
      `${process.env.REACT_APP_API}/message`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };