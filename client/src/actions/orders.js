import axios from "axios";


export const createOrder = async (expId, token) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-order`,
    expId,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


