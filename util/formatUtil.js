const moment = require('moment');
import { isNullOrBlank } from './shippoAPIRequestHandler';

export function dateComparator(a, b) {
  if (Date.parse(a.statusDate) > Date.parse(b.statusDate)) {
    return -1;
  } else if (Date.parse(a.statusDate) < Date.parse(b.statusDate)) {
    return 1;
  }
  return 0;
}

export function formatDatePretty(date) {
  // return isNullOrBlank(date) ? 'N/A' : moment(date).format('LLL');
  if (isNullOrBlank(date)) {
    return 'N/A';
  }

  return moment(date).format('LLL');
}

export function formatAddress(address) {
  return `${address.city}, ${address.state} ${address.zip} ${address.country}`;
}
