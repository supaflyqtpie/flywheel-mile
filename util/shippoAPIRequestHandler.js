const fetch = require('node-fetch');

const baseURI = 'https://api.goshippo.com/v1/tracks';

export function isNullOrBlank(obj) {
  return (typeof obj == 'undefined' || obj === null || obj === '');
}

export function get(obj, key) {
  return key.split('.').reduce((p, c) => {
    return isNullOrBlank(obj) ? p : p[c];
  }, obj);
}

function buildURI(carrier, trackingNumber) {
  return `${baseURI}/${carrier}/${trackingNumber}/`;
}

function transformResponse(json) {
  const basicInfoMap = {
    carrier: get(json, 'carrier'),
    trackingNumber: get(json, 'tracking_number'),
    addressFrom: {
      city: get(json, 'address_from.city'),
      state: get(json, 'address_from.state'),
      zip: get(json, 'address_from.zip'),
      country: get(json, 'address_from.country'),
    },
    addressTo: {
      city: get(json, 'address_to.city'),
      state: get(json, 'address_from.state'),
      zip: get(json, 'address_from.zip'),
      country: get(json, 'address_from.country'),
    },
    eta: get(json, 'eta'),
    serviceLevel: {
      token: get(json, 'servicelevel.token'),
      name: get(json, 'servicelevel.name'),
    },
    metadata: get(json, 'metadata'),
    trackingStatus: {
      status: get(json, 'tracking_status.status'),
      statusDetail: get(json, 'tracking_status.status_details'),
      statusDate: get(json, 'tracking_status.status_date'),
      city: get(json, 'tracking_status.location.city'),
      state: get(json, 'tracking_status.location.state'),
      zip: get(json, 'tracking_status.location.zip'),
      country: get(json, 'tracking_status.location.country'),
    },
  };
  return Object.assign({}, basicInfoMap, {
    trackingHistory: json.tracking_history.map((value) => {
      return {
        statusDate: get(value, 'status_date'),
        city: get(value, 'location.city'),
        state: get(value, 'location.state'),
        zip: get(value, 'location.zip'),
        country: get(value, 'location.country'),
        status: get(value, 'status'),
        statusDetail: get(value, 'status_details'),
      };
    }),
  });
}

export function shippoGet(carrier, trackingNumber) {
  return new Promise((resolve, reject) => {
    fetch(buildURI(carrier, trackingNumber)).then((response) => {
      debugger;
      response.json().then((json) => {
        debugger;
        if (!response.ok || !json || !json.tracking_status) {
          reject('Error retrieving info from Shippo');
        } else {
          resolve(transformResponse(json));
        }
      }).catch((err) => { reject('Error parsing json from Shippo'); });
    });
  });
}
