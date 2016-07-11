import { query } from '../helpers';

export const REQUEST_PACKAGES = 'REQUEST_PACKAGES';
export const RECEIVED_PACKAGES = 'RECEIVED_PACKAGES';
export const ADD_PACKAGE = 'ADD_PACKAGE';
export const DELETE_PACKAGE = 'DELETE_PACKAGE';
export const PROCESS_ADD_PACKAGE = 'PROCESS_ADD_PACKAGE';
export const PROCESS_DELETE_PACKAGE = 'PROCESS_DELETE_PACKAGE';
export const ADD_ADD_PACKAGE_ERROR = 'ADD_ADD_PACKAGE_ERROR';
export const RESET_ADD_PACKAGE_ERROR = 'RESET_ADD_PACKAGE_ERROR';

function requestPackages() {
  return {
    type: REQUEST_PACKAGES,
  };
}

export function receivedPackages(packages) {
  return {
    type: RECEIVED_PACKAGES,
    packages,
  };
}

function processAddPackage() {
  return {
    type: PROCESS_ADD_PACKAGE,
  };
}

function processDeletePackage(id) {
  return {
    type: PROCESS_DELETE_PACKAGE,
    id,
  };
}

function addPackage(id, carrier, trackingNumber) {
  return {
    type: ADD_PACKAGE,
    id,
    carrier,
    trackingNumber,
  };
}

function deletePackage(id) {
  return {
    type: DELETE_PACKAGE,
    id,
  };
}

function addAddPackageError() {
  return {
    type: ADD_ADD_PACKAGE_ERROR,
  };
}

export function resetAddPackageError() {
  return {
    type: RESET_ADD_PACKAGE_ERROR,
  };
}

function createGetPackagesRequest() {
  return {
    path: '/packages',
    method: 'GET',
  };
}

export function getSubscribedPackages() {
  const request = createGetPackagesRequest();
  return (dispatch, getState) => {
    dispatch(requestPackages());
    query(request).then((response) => {
      response.json().then((json) => dispatch(receivedPackages(json)));
    }).catch((error) => {});
  };
}

function createAddPackageRequest(carrier, trackingNumber) {
  return {
    path: '/packages',
    method: 'POST',
    body: {
      package: {
        carrier,
        trackingNumber,
      },
    },
  };
}

export function requestToAddPackage(carrier, trackingNumber) {
  const request = createAddPackageRequest(carrier, trackingNumber);
  return (dispatch, getState) => {
    query(request).then((response) => {
      response.json().then((json) => {
        if (!response.ok) {
          dispatch(addAddPackageError());
        } else {
          dispatch(addPackage(json.id, json.carrier, json.trackingNumber));
        }
      });
    }).catch((error) => {});
    dispatch(processAddPackage());
  };
}

function createDeletePackageRequest(id) {
  return {
    path: `/packages/${id}`,
    method: 'DELETE',
  };
}

export function requestToDeletePackage(id) {
  const request = createDeletePackageRequest(id);
  return (dispatch, getState) => {
    dispatch(processDeletePackage(id));
    query(request).then((json) => {
      dispatch(deletePackage(id));
    }).catch((error) => {
    });
  };
}
