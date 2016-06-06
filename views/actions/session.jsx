import fetch from 'isomorphic-fetch';

export const PROCESS_USER = 'PROCESS_USER';
export const SIGNED_IN = 'SIGNED_IN';
export const SIGNED_OUT = 'SIGNED_OUT';

function processUser() {
  return {
    type: PROCESS_USER,
  };
}

function signedIn(json) {
  return {
    type: SIGNED_IN,
    username: json.data.username,
  };
}

function signedOut() {
  return {
    type: SIGNED_OUT,
  };
}

function createSession(user) {
  return dispatch => {
    dispatch(processUser());
    return fetch('/session', {
      method: 'POST',
      body: user.json,
    }).then(response => response.json())
      .then(json => dispatch(signedIn(json)));
  };
}

export function userSignIn(user) {
  return (dispatch, getState) => dispatch(createSession(user));
}

function destroySession() {
  return dispatch => {
    dispatch(processUser());
    return fetch('/session', {
      method: 'DESTROY',
    }).then(response => response.json())
      .then(json => dispatch(signedOut()));
  };
}

export function userSignOut() {
  return (dispatch, getState) => dispatch(destroySession());
}
