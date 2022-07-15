import axios from "axios";


export const createOrder = async (data, token) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-order`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


