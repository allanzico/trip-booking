import {combineReducers} from 'redux';
import {authReducer} from './auth'
import { experiencesReducer, mapStateReducer } from './experiences';
import { messagesReducer } from './messaging';
import { userReducer } from './users';


//Combine Multiple reducers
const rootReducer = combineReducers({
    auth: authReducer,
    experiences: experiencesReducer,
    map:mapStateReducer,
    user: userReducer,
    messaging: messagesReducer
  })

  export default rootReducer;