const UPDATE_USER = 'UPDATE_USER'

let userState;

if (window.localStorage.getItem('auth')) {
  userState = JSON.parse(window.localStorage.getItem('auth'));
} else {
  userState = null;
}

//Create auth reducer
export const authReducer = (state=userState, {type,payload}) => {
    switch(type) {
      case 'LOGGED_IN_USER' :
        return {...state, ...payload, };
      case 'UPDATE_USER' :
        return {...state, ...payload, };
      case 'LOGOUT':
        return payload;
      default:
        return state;
    }
  }

  //Update user details
  export function updateUser(data) {
    return {
      type: UPDATE_USER,
      payload: data,
    };
  }



