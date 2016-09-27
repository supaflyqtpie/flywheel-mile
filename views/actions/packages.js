import { query } from '../helpers';

export const REQUEST_PACKAGES = 'REQUEST_PACKAGES';
export const RECEIVED_PACKAGES = 'RECEIVED_PACKAGES';
export const ADD_PACKAGE = 'ADD_PACKAGE';
export const DELETE_PACKAGE = 'DELETE_PACKAGE';
export const PROCESS_ADD_PACKAGE = 'PROCESS_ADD_PACKAGE';
export const PROCESS_DELETE_PACKAGE = 'PROCESS_DELETE_PACKAGE';
export const ADD_ADD_PACKAGE_ERROR = 'ADD_ADD_PACKAGE_ERROR';
export const RESET_ADD_PACKAGE_ERROR = 'RESET_ADD_PACKAGE_ERROR';
export const ADD_GET_PACKAGES_ERROR = 'ADD_GET_PACKAGES_ERROR';
export const RESET_GET_PACKAGES_ERROR = 'RESET_GET_PACKAGES_ERROR';
export const ADD_PACKAGE_HISTORY = 'ADD_PACKAGE_HISTORY';

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

function addAddPackageError(msg) {
  return {
    type: ADD_ADD_PACKAGE_ERROR,
    msg,
  };
}

export function resetAddPackageError() {
  return {
    type: RESET_ADD_PACKAGE_ERROR,
  };
}

function addGetPackagesError(msg) {
  return {
    type: ADD_GET_PACKAGES_ERROR,
    msg,
  };
}

export function resetGetPackagesError() {
  return {
    type: RESET_GET_PACKAGES_ERROR,
  };
}

export function addPackageHistory(history) {
  return {
    type: ADD_PACKAGE_HISTORY,
    history,
  };
}

function createGetPackagesRequest() {
  return {
    path: '/packages',
    method: 'GET',
  };
}

function createGetPackageHistoryRequest(id) {
  return {
    path: `/packages/${id}/packageHistory`,
    method: 'GET',
  };
}

export function getSubscribedPackages() {
  const request = createGetPackagesRequest();
  let packagesResponse;
  return (dispatch, getState) => {
    dispatch(requestPackages());
    query(request).then((response) => {
      response.json().then((json) => {
        if (!response.ok) {
          dispatch(addGetPackagesError(json.message));
        } else {
          packagesResponse = json;
          const historyQueries = json.map((item) => {
            const request2 = createGetPackageHistoryRequest(item.id);
            return query(request2);
          });
          return Promise.all(historyQueries);
        }
      }).then((histories) => {
        const json2 = histories.map((stuff) => {
          return stuff.json();
        });
        return Promise.all(json2);
      }).then((result) => {
        return packagesResponse.map((pkg, index) => {
          return Object.assign({}, pkg, { history: result[index] });
        });
      }).then((result) => {
        dispatch(receivedPackages(result));
      });
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
    dispatch(processAddPackage());
    query(request).then((response) => {
      return response.json().then((json) => {
        if (!response.ok) {
          throw new Error(json.message);
        } else {
          dispatch(addPackage(json.id, json.carrier, json.trackingNumber));
        }
      }).catch((error) => {
        dispatch(addAddPackageError(error.message));
      });
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
    });
  };
}
