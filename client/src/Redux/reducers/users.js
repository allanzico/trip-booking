const GET_USER = "GET_USER";
const SET_TW0_FACTOR_AUTH = 'UPDATE_USER'

const initialState = {
  user: null,
  twofactorAuth:false
};


export function fetchUser(user) {
  return {
    type: GET_USER,
    payload: user,
  };
}

  //set two factor authentication
  export function setTwoFactorAuth(twofactorAuth) {
    return {
      type: SET_TW0_FACTOR_AUTH,
      payload: twofactorAuth,
    };
  }

export const userReducer = (state = initialState, {type, payload}) => {
    switch (type) {
      case "GET_USER":
        return { ...state, user: payload };
        case 'SET_TW0_FACTOR_AUTH' :
          return {...state, ...payload, };
      default:
        return state;
    }
  };
