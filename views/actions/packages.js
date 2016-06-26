import { query } from '../helpers';

export const REQUEST_PACKAGES = 'REQUEST_PACKAGES';
export const RECEIVED_PACKAGES = 'RECEIVED_PACKAGES';
export const ADD_PACKAGE = 'ADD_PACKAGE';
export const DELETE_PACKAGE = 'DELETE_PACKAGE';
export const PROCESS_ADD_PACKAGE = 'PROCESS_ADD_PACKAGE';
export const PROCESS_DELETE_PACKAGE = 'PROCESS_DELETE_PACKAGE';

function requestPackages() {
  return {
    type: REQUEST_PACKAGES,
  };
}

function receivedPackages(packages) {
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

function addPackage(id, trackingNumber) {
  return {
    type: ADD_PACKAGE,
    id,
    trackingNumber,
  };
}

function deletePackage(id) {
  return {
    type: DELETE_PACKAGE,
    id,
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
    query(request).then((json) => {
      dispatch(receivedPackages(json));
    }).catch((error) => {
      debugger;
    });
  };
}

function createAddPackageRequest(trackingNumber) {
  return {
    path: '/packages',
    method: 'POST',
    body: {
      package: {
        trackingNumber,
      },
    },
  };
}

export function requestToAddPackage(trackingNumber) {
  const request = createAddPackageRequest(trackingNumber);
  return (dispatch, getState) => {
    dispatch(processAddPackage());
    query(request).then((json) => {
      dispatch(addPackage(json.id, json.trackingNumber));
    }).catch((error) => {
      debugger;
    });
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
      debugger;
    });
  };
}
