import { combineReducers } from 'redux';
import userSessions from './session';

const index = combineReducers({
  userSessions,
});

module.exports = index;
