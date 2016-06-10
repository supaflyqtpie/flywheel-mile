import {push} from 'react-router-redux';

export const PROCESS_USER = 'PROCESS_USER';
export const SIGNED_IN = 'SIGNED_IN';
export const SIGNED_OUT = 'SIGNED_OUT';
export const ERROR = 'AUTH_ERROR';

function processUser() {
  return {type: PROCESS_USER};
}

function signedIn(json) {
  return {type: SIGNED_IN, email: json.email};
}

function signedOut() {
  return {type: SIGNED_OUT};
}

function authError() {
  return {type: ERROR};
}

function createSession(user) {
  return dispatch => {
    dispatch(processUser());
    return fetch('/session', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user),
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
          dispatch(signedIn(response));
          dispatch(push('/packages'));
        });
      } else {
        dispatch(authError());
      }
    })

  };
}

export function loginUser(email, password) {
  const user = {
    email,
    password
  };
  return (dispatch, getState) => dispatch(createSession(user));
}

function destroySession() {
  return dispatch => {
    dispatch(processUser());
    return fetch('/session', {method: 'DELETE'}).then(() => {
      dispatch(signedOut());
      dispatch(push('/'));
    });
  };
}

export function logoutUser() {
  return (dispatch, getState) => dispatch(destroySession());
}
