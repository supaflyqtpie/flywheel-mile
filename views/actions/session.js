import { push } from 'react-router-redux';
import { query } from '../helpers';

export const PROCESS_USER = 'PROCESS_USER';
export const SIGNED_IN = 'SIGNED_IN';
export const SIGNED_OUT = 'SIGNED_OUT';
export const AUTH_ERROR = 'AUTH_ERROR';
export const RESET_AUTH_ERROR = 'RESET_AUTH_ERROR';
export const ADD_REGISTRATION_ERROR = 'ADD_REGISTRATION_ERROR';

const REGISTRATION_MATCH_ERROR = 'Oops! Passwords do not match';
const REGISTRATION_LENGTH_ERROR = 'Password must be 6 or more characters';
const REGISTRATION_EMAIL_ERROR = 'Oops! That email is already taken';
const REGISTRATION_EMAIL_PASSWORD_ERROR = 'Please enter email and password';

let errorKey = 0;

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
}

export function addRegistrationErrors(errors) {
  return {
    type: ADD_REGISTRATION_ERROR,
    errors,
  };
}

function handleAuthErrors(dispatch, json) {
  dispatch(authError());
}

function handleRegistrationErrors(dispatch, json) {
  // Duplicate email: db could not create user
  dispatch(addRegistrationErrors([{
    message: REGISTRATION_EMAIL_ERROR,
    key: errorKey++,
  }]));
}

function createSession(request, errorHandler) {
  return dispatch => {
    dispatch(processUser());
    return query(request).then(response => {
      response.json().then(json => {
        if (response.ok) {
          dispatch(signedIn(json));
          dispatch(push('/packages'));
        } else {
          errorHandler(dispatch, json);
        }
      });
    });
  };
}

function destroySession(request) {
  return dispatch => {
    dispatch(processUser());
    return query(request)
    .then(() => {
      dispatch(signedOut());
      dispatch(push('/'));
    });
  };
}

function doRegistration(email, password, confirmPassword, request) {
  const errorList = [];
  if (!password || !email) {
    errorList.push({
      message: REGISTRATION_EMAIL_PASSWORD_ERROR,
      key: errorKey++,
    });
  } else {
    if (password !== confirmPassword) {
      errorList.push({
        message: REGISTRATION_MATCH_ERROR,
        key: errorKey++,
      });
    }
    if (password && password.length < 6) {
      errorList.push({
        message: REGISTRATION_LENGTH_ERROR,
        key: errorKey++,
      });
    }
  }
  if (errorList.length > 0) {
    return dispatch => {
      dispatch(addRegistrationErrors(errorList));
    };
  }
  return (dispatch, getState) => dispatch(createSession(request, handleRegistrationErrors));
}

export function registerUser(email, password, confirmPassword) {
  const request = {
    path: '/user',
    method: 'POST',
    body: {
      email,
      password,
      confirmPassword,
    },
  };
  return (dispatch, getState) => dispatch(doRegistration(email,
    password,
    confirmPassword,
    request));
}

export function loginUser(email, password) {
  const request = {
    path: '/session',
    method: 'POST',
    body: {
      email,
      password,
    },
  };
  return (dispatch, getState) => dispatch(createSession(request, handleAuthErrors));
}

export function logoutUser() {
  const request = {
    path: '/session',
    method: 'DELETE',
  };
  return (dispatch, getState) => dispatch(destroySession(request));
}
