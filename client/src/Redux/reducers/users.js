const GET_USER = "GET_USER";

const initialState = {
  user: null,
};

export function fetchUser(user) {
  return {
    type: GET_USER,
    payload: user,
  };
}

export const userReducer = (state = initialState, {type, payload}) => {
    switch (type) {
      case "GET_USER":
        return { ...state, user: payload };
      default:
        return state;
    }
  };