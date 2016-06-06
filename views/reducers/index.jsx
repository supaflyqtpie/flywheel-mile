import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userSessions from './session';

const rootReducer = combineReducers({
  userSessions,
  routing: routerReducer,
});

export default rootReducer;
