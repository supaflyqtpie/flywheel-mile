import { PROCESS_USER, SIGNED_IN, SIGNED_OUT, AUTH_ERROR, RESET_AUTH_ERROR } from '../actions/session';

const user = function user(state = {
  isProcessing: false,
  signedIn: false,
  email: '',
  authError: false,
}, action) {
  switch (action.type) {
    case PROCESS_USER:
      return Object.assign({}, state, {
        isProcessing: true,
      });
    case SIGNED_IN:
      return Object.assign({}, state, {
        isProcessing: false,
        signedIn: true,
        email: action.email,
        authError: false,
      });
    case SIGNED_OUT:
      return Object.assign({}, state, {
        isProcessing: false,
        signedIn: false,
        email: '',
      });
    case AUTH_ERROR:
      return Object.assign({}, state, {
        authError: true,
      });
    case RESET_AUTH_ERROR:
      return Object.assign({}, state, {
        authError: false,
      });
    default:
      return state;
  }
};

function session(state = {}, action) {
  switch (action.type) {
    case PROCESS_USER:
      return Object.assign({}, state, user(state.session, action));
    case SIGNED_IN:
      return Object.assign({}, state, user(state.session, action));
    case AUTH_ERROR:
      return Object.assign({}, state, user(state.session, action));
    case RESET_AUTH_ERROR:
      return Object.assign({}, state, user(state, action));
    case SIGNED_OUT:
      return Object.assign({}, state, user(state.session, action));
    default:
      return state;
  }
}

module.exports = session;
