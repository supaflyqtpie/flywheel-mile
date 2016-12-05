import { query } from '../helpers';
import { dateComparator } from '../../util/formatUtil';
import { push } from 'react-router-redux';

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
export const UPDATE_CURRENT_PACKAGE_DETAIL = 'UPDATE_CURRENT_PACKAGE_DETAIL';

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

function addPackage(id, carrier, trackingNumber, history) {
  return {
    type: ADD_PACKAGE,
    id,
    carrier,
    trackingNumber,
    history,
  };
}

function updateCurrentPackageDetail(id, carrier, trackingNumber, history) {
  return {
    type: UPDATE_CURRENT_PACKAGE_DETAIL,
    id,
    carrier,
    trackingNumber,
    history,
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

function getAndAddPackageHistories(packages) {
  const historyQueries = packages.map((item) => {
    const request = createGetPackageHistoryRequest(item.id);
    return query(request);
  });

  return Promise.all(historyQueries).then((histories) => {
    const json = histories.map((data) => {
      return data.json();
    });
    return Promise.all(json);
  });
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
          return getAndAddPackageHistories(json);
        }
      }).then((result) => {
        return packagesResponse.map((pkg, index) => {
          return Object.assign({}, pkg, { history: result[index] });
        });
      }).then((result) => {
        dispatch(receivedPackages(result));
      }).catch((error) => { console.log(error); });
    }).catch((error) => { console.log(error); });
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

function sortHistoryByDate(history) {
  return history.sort((a, b) => {
    return dateComparator(a, b);
  });
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
          dispatch(addPackage(json.id, json.carrier, json.trackingNumber, sortHistoryByDate(json.history)));
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

function createQueryPackageRequest(trackingNumber, carrier) {
  return {
    path: '/queryPackage',
    method: 'POST',
    body: {
      package: {
        carrier,
        trackingNumber,
      },
    },
  };
}

export function queryPackage(carrier, trackingNumber) {
  const request = createQueryPackageRequest(trackingNumber, carrier);
  return (dispatch, getState) => {
    query(request).then((response) => {
      response.json().then((json) => {
        dispatch(updateCurrentPackageDetail(0, json.carrier, json.trackingNumber, sortHistoryByDate(json.trackingHistory)));
        dispatch(push('/details'));
      });
    }).catch((error) => {
      dispatch(addAddPackageError('Error query package'));
    });
  };
}
