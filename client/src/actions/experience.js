import axios from "axios";

export const addExperience = async (token, data) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-experience`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateExperience = async (token, data, expId) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/update-experience/${expId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getExperiences = async (cancelToken) => {
  return await axios.get(`${process.env.REACT_APP_API}/experiences`, {
    cancelToken: cancelToken,
});
};

export const diffDays = (start, end) => {
  const day = 24 * 60 * 60 * 1000;
  const startDate = new Date(start);
  const endDate = new Date(end);
  return Math.round(Math.abs((startDate - endDate) / day));
};

export const getSellerExperiences = async (token, cancelToken) => {
  return await axios.get(`${process.env.REACT_APP_API}/seller-experiences`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    cancelToken:cancelToken
  });
};

export const getSingleExperience = async (expId, cancelToken) => {
  return await axios.get(`${process.env.REACT_APP_API}/experience/${expId}`, {cancelToken:cancelToken});
};

export const deleteSingleExperience = async ( expId , token) => {
  return await axios.delete(
    `${process.env.REACT_APP_API}/delete-experience/${expId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteTicket = async ( expId , data, token) => {
  return await axios.patch(
    `${process.env.REACT_APP_API}/delete-ticket/${expId}`, data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getUserBookings = async (token, cancelToken) => {
  return await axios.get(`${process.env.REACT_APP_API}/user-experience-bookings`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    cancelToken: cancelToken,
  });
};

export const getSingleBooking = async (bookingId, token, cancelToken) => {
  return await axios.get(`${process.env.REACT_APP_API}/booking/${bookingId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    cancelToken: cancelToken,
  });
};

export const isAlreadyBooked = async (token, expId, cancelToken) => {
  return await axios.get(`${process.env.REACT_APP_API}/is-already-booked/${expId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    cancelToken: cancelToken
  });
};

export const searchListings = async (query,   cancelToken) => {
  return await axios.post(`${process.env.REACT_APP_API}/search-listings`, query, {
    cancelToken: cancelToken
  });
};

export const reviewExperience = async (token, expId, data) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/review-experience/${expId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const favoriteExperience = async (token, data) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/favorite-experience`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getUserFavorites = async (token, cancelToken) => {
  return await axios.get(`${process.env.REACT_APP_API}/user-favorites`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    cancelToken: cancelToken,
  });
};


export const isAlreadyFavorited = async (token, expId, cancelToken) => {
  return await axios.get(`${process.env.REACT_APP_API}/is-already-favorited/${expId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    cancelToken: cancelToken
  });
};

export const favoriteNumber = async (data, cancelToken) => {
  return await axios.get(`${process.env.REACT_APP_API}/favorite-number`, data, {
    cancelToken: cancelToken
  });
};

export const createItenerary = async (data,expId, token) => {
  return await axios.post(`${process.env.REACT_APP_API}/create-itenerary/${expId}`, data,     {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
};

export const getCloudinarySignature = async (token) => {
  return await axios.get(`${process.env.REACT_APP_API}/cloudinary-signature`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  
  });
};