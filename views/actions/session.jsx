import { push } from 'react-router-redux';
import { query } from '../helpers';

export const PROCESS_USER = 'PROCESS_USER';
export const SIGNED_IN = 'SIGNED_IN';
export const SIGNED_OUT = 'SIGNED_OUT';

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

function createSession(user) {
  return dispatch => {
    dispatch(processUser());
    const request = {
      path: '/session',
      method: 'POST',
      body: user,
    };

    return query(request)
      .then(response => response.json())
      .then(json => {
        dispatch(signedIn(json));
        dispatch(push('/packages'));
      });
  };
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
