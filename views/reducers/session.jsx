import { PROCESS_USER, SIGNED_IN, SIGNED_OUT, ERROR } from '../actions/session';

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
    case ERROR:
      return Object.assign({}, state, {
        authError: true,
      });
    default:
      return state;
  }
};

function session(state = {}, action) {
  switch (action.type) {
    case PROCESS_USER:
    case SIGNED_IN:
    case ERROR:
    case SIGNED_OUT:
      return Object.assign({}, state, user(state.session, action));
    default:
      return state;
  }
}

module.exports = session;
