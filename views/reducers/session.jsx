import { PROCESS_USER, SIGNED_IN, SIGNED_OUT } from '../actions/user';

const user = function user(state = {
  isProcessing: false,
  signedIn: false,
  username: '',
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
        username: action.username,
      });
    case SIGNED_OUT:
      return Object.assign({}, state, {
        isProcessing: false,
        signedIn: false,
        username: '',
      });
    default:
      return state;
  }
};

function userSessions(state = {}, action) {
  switch (action.type) {
    case PROCESS_USER:
    case SIGNED_IN:
    case SIGNED_OUT:
      return Object.assign({}, state, {
        session: user(state.session, action),
      });
    default:
      return state;
  }
}

module.exports = userSessions;
