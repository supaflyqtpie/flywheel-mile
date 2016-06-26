import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import session from './session';
import packages from './packages';

const rootReducer = combineReducers({
  session,
  packages,
  routing: routerReducer,
});

export default rootReducer;
