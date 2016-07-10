import { query } from '../helpers';
import { shippoGet } from '../../shippoAPIRequestHandler';

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
    shippoGet(carrier, trackingNumber).then((response) => {
      response.json().then((json) => {
        if (!json || !json.tracking_status) {
          // get fucked
        } else {
          query(request).then((response2) => {
            response2.json().then((json2) => {
              dispatch(addPackage(json2.id, json2.carrier, json2.trackingNumber));
            });
          }).catch((error) => {
          });
        }
      });
    });
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
