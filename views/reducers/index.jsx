import { combineReducers } from 'redux';
import userSessions from './session';

const rootReducer = combineReducers({
  userSessions,
});

export default rootReducer;
