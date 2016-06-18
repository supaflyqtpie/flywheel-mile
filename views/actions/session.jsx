import { push } from 'react-router-redux';
import { query } from '../helpers';

export const PROCESS_USER = 'PROCESS_USER';
export const SIGNED_IN = 'SIGNED_IN';
export const SIGNED_OUT = 'SIGNED_OUT';
export const AUTH_ERROR = 'AUTH_ERROR';
export const RESET_AUTH_ERROR = 'RESET_AUTH_ERROR';

function processUser() {
  return {
    type: PROCESS_USER,
  };
}

export function signedIn(json) {
  return {
    type: SIGNED_IN,
    email: json.email,
  };
}

function signedOut() {
  return {
    type: SIGNED_OUT,
  };
}

function authError() {
  return {
    type: AUTH_ERROR,
  };
}

export function resetAuthError() {
  return {
    type: RESET_AUTH_ERROR,
  };

function createSession(user) {
  return dispatch => {
    dispatch(processUser());
    const request = {
      path: '/session',
      method: 'POST',
      body: user,
    };

    return query(request).then(response => {
      if (response.ok) {
        response.json().then(json => {
          dispatch(signedIn(json));
          dispatch(push('/packages'));
        });
      } else {
        dispatch(authError());
      }
    })
  }
}

export function loginUser(email, password) {
  const user = {
    email,
    password,
  };
  return (dispatch, getState) => dispatch(createSession(user));
}

function destroySession() {
  return dispatch => {
    dispatch(processUser());
    const request = {
      path: '/session',
      method: 'DELETE',
    };

    return query(request)
    .then(() => {
      dispatch(signedOut());
      dispatch(push('/'));
    });
  };
}

export function logoutUser() {
  return (dispatch, getState) => dispatch(destroySession());
}
