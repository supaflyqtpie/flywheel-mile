import {
  PROCESS_USER,
  SIGNED_IN,
  SIGNED_OUT, AUTH_ERROR,
  RESET_AUTH_ERROR,
  ADD_REGISTRATION_ERROR,
} from '../actions/session';

const user = function user(state, action) {
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
        isProcessing: false,
      });
    case RESET_AUTH_ERROR:
      return Object.assign({}, state, {
        authError: false,
        registrationErrors: [],
      });
    case ADD_REGISTRATION_ERROR:
      return Object.assign({}, state, {
        registrationErrors: action.errors,
      });
    default:
      return state;
  }
};

export default function session(state = {
  isProcessing: false,
  signedIn: false,
  email: '',
  authError: false,
  registrationErrors: [],
}, action) {
  switch (action.type) {
    case PROCESS_USER:
    case SIGNED_IN:
    case SIGNED_OUT:
    case AUTH_ERROR:
    case RESET_AUTH_ERROR:
    case ADD_REGISTRATION_ERROR:
      return Object.assign({}, state, user(state, action));
    default:
      return state;
  }
}
