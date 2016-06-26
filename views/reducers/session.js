import {
  PROCESS_USER,
  SIGNED_IN,
  SIGNED_OUT, AUTH_ERROR,
  RESET_AUTH_ERROR,
  REGISTRATION_ERROR_PASSWORD,
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
        registrationErrorPassword: false,
      });
    case REGISTRATION_ERROR_PASSWORD:
      return Object.assign({}, state, {
        registrationErrorPassword: true,
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
}, action) {
  switch (action.type) {
    case PROCESS_USER:
    case SIGNED_IN:
    case SIGNED_OUT:
    case AUTH_ERROR:
    case RESET_AUTH_ERROR:
    case REGISTRATION_ERROR_PASSWORD:
      return Object.assign({}, state, user(state, action));
    default:
      return state;
  }
}
