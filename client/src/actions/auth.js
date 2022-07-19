import axios from "axios";

export const register = async (user) => {
  return await axios.post(`${process.env.REACT_APP_API}/register`, user);
};

export const login = async (user) => {
  return await axios.post(`${process.env.REACT_APP_API}/login`, user);
};

export const resetPassword = async (password, resetToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/reset-password/${resetToken}`,
    { password }
  );
};

export const forgotPassword = async (email) => {
  return await axios.post(`${process.env.REACT_APP_API}/forgot-password`, {
    email,
  });
};

export const enableTwofactorAuth = async (data, token) => {
  return await axios.post(`${process.env.REACT_APP_API}/enable-2fa`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const logoutUser = async (data, token) => {
  return await axios.post(`${process.env.REACT_APP_API}/logout`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const verifyTwofactorAuth = async (data, token) => {
  return await axios.post(`${process.env.REACT_APP_API}/verify`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editProfile = async (user, token, cancelToken) => {
  return await axios.put(`${process.env.REACT_APP_API}/edit-profile`, user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cancelToken: cancelToken,
  });
};

export const getUserById = async (userId, token, cancelToken) => {
  return await axios.get(`${process.env.REACT_APP_API}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cancelToken: cancelToken,
  });
};

export const getUserInterests = async (cancelToken) => {
  return await axios.get(`${process.env.REACT_APP_API}/user-interests`, {
    cancelToken: cancelToken,
  });
};

//update local storage
export const updateLocalStorage = async (user, next) => {
  if (window.localStorage.getItem("auth")) {
    let auth = JSON.parse(localStorage.getItem("auth"));
    auth.user = user;
    localStorage.setItem("auth", JSON.stringify(auth));
    next();
  }
};
