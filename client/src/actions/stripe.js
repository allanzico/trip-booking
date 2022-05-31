import axios from "axios";

export const createStripeAccount = async (token) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-stripe-account`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAccountStatus = async (token) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/get-account-status`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAccountBalance = async (token) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/get-account-balance`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

//format currency
export const currencyFormatter = (data) => {
  return (data.amount/100).toLocaleString(data.currency, {
    style: "currency",
    currency: data.currency,
  });
};

export const payoutSetting = async (token) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/payout-setting`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getSessionId = async (token, expId) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/stripe-session-id`,
    { expId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const stripeSuccessRequest = async (token, expId) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/stripe-success`,
    { expId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
