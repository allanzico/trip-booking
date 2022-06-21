import axios from "axios";

export const registerCompany = async (data, token) => {
    return await axios.post(`${process.env.REACT_APP_API}/register-company`, data,     {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
};

export const isAlreadyRegistered = async (token, cancelToken) => {
  return await axios.get(`${process.env.REACT_APP_API}/is-already-registered`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    cancelToken: cancelToken
  });
};