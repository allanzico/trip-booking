import axios from "axios";

export const getMessages = async (conversationId, token) => {
    return await axios.get(`${process.env.REACT_APP_API}/messages/${conversationId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      } );
  };

  export const sendMessage = async (token, data) => {
    return await axios.post(
      `${process.env.REACT_APP_API}/create-message`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };