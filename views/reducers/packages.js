import {
  REQUEST_PACKAGES,
  RECEIVED_PACKAGES,
  ADD_PACKAGE,
  DELETE_PACKAGE,
  PROCESS_ADD_PACKAGE,
  PROCESS_DELETE_PACKAGE,
  ADD_ADD_PACKAGE_ERROR,
  RESET_ADD_PACKAGE_ERROR,
  ADD_GET_PACKAGES_ERROR,
  RESET_GET_PACKAGES_ERROR,
  UPDATE_CURRENT_PACKAGE_DETAIL,
} from '../actions/packages';

function singlePackage(item, action) {
  switch (action.type) {
    case UPDATE_CURRENT_PACKAGE_DETAIL:
    case ADD_PACKAGE:
      return {
        id: action.id,
        carrier: action.carrier,
        trackingNumber: action.trackingNumber,
        history: action.history,
        isProcessingDelete: false,
        origin: action.origin,
        destination: action.destination,
        eta: action.eta,
        serviceLevel: action.serviceLevel,
      };
    case PROCESS_DELETE_PACKAGE:
      if (item.id !== action.id) {
        return item;
      }
      return Object.assign({}, item, {
        isProcessingDelete: true,
      });
    default:
      return item;
  }
}

function packages(state, action) {
  switch (action.type) {
    case REQUEST_PACKAGES:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVED_PACKAGES:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.packages,
      });
    case PROCESS_ADD_PACKAGE:
      return Object.assign({}, state, {
        isAdding: true,
      });
    case ADD_PACKAGE:
      return Object.assign({}, state, {
        isAdding: false,
        addPackageError: '',
        getPackagesError: '',
        items: [...state.items, singlePackage(undefined, action)],
      });
    case UPDATE_CURRENT_PACKAGE_DETAIL:
      return Object.assign({}, state, {
        addPackageError: '',
        getPackagesError: '',
        packageDetail: singlePackage(undefined, action),
      });
    case PROCESS_DELETE_PACKAGE:
      return Object.assign({}, state, {
        items: state.items.map((item) => { return singlePackage(item, action); }),
      });
    case DELETE_PACKAGE:
      return Object.assign({}, state, {
        items: state.items.filter((item) => { return item.id !== action.id; }),
      });
    case ADD_ADD_PACKAGE_ERROR:
      return Object.assign({}, state, {
        isAdding: false,
        addPackageError: action.msg,
      });
    case RESET_ADD_PACKAGE_ERROR:
      return Object.assign({}, state, {
        addPackageError: '',
      });
    case ADD_GET_PACKAGES_ERROR:
      return Object.assign({}, state, {
        getPackagesError: action.msg,
        isFetching: false,
      });
    case RESET_GET_PACKAGES_ERROR:
      return Object.assign({}, state, {
        getPackagesError: '',
      });
    default:
      return state;
  }
}

export default function trackedPackages(state = {
  isFetching: false,
  isAdding: false,
  addPackageError: '',
  getPackagesError: '',
  items: [],
  packageDetail: {},
}, action) {
  switch (action.type) {
    case REQUEST_PACKAGES:
    case RECEIVED_PACKAGES:
    case PROCESS_ADD_PACKAGE:
    case PROCESS_DELETE_PACKAGE:
    case ADD_PACKAGE:
    case ADD_ADD_PACKAGE_ERROR:
    case RESET_ADD_PACKAGE_ERROR:
    case ADD_GET_PACKAGES_ERROR:
    case RESET_GET_PACKAGES_ERROR:
    case UPDATE_CURRENT_PACKAGE_DETAIL:
    case DELETE_PACKAGE:
      return Object.assign({}, state, packages(state, action));
    default:
      return state;
  }
}
