const fetch = require('node-fetch');

const baseURI = 'https://api.goshippo.com/v1/tracks';

function buildURI(carrier, trackingNumber) {
  return `${baseURI}/${carrier}/${trackingNumber}/`;
}

function transformResponse(json) {
  const basicInfoMap = {
    carrier: json.carrier,
    trackingNumber: json.tracking_number,
    addressFrom: {
      city: json.address_from.city,
      state: json.address_from.state,
      zip: json.address_from.zip,
      country: json.address_from.country,
    },
    addressTo: {
      city: json.address_to.city,
      state: json.address_from.state,
      zip: json.address_from.zip,
      country: json.address_from.country,
    },
    eta: json.eta,
    serviceLevel: {
      token: json.servicelevel.token,
      name: json.servicelevel.name,
    },
    metadata: json.metadata,
    trackingStatus: {
      status: json.tracking_status.status,
      statusDetail: json.tracking_status.status_details,
      statusDate: json.tracking_status.status_date,
      city: json.tracking_status.location.city,
      state: json.tracking_status.location.state,
      zip: json.tracking_status.location.zip,
      country: json.tracking_status.location.country,
    },
  };
  return Object.assign({}, basicInfoMap, {
    trackingHistory: json.tracking_history.map((value) => {
      return {
        statusDate: value.status_date,
        city: value.location.city,
        state: value.location.state,
        zip: value.location.zip,
        country: value.location.country,
        status: value.status,
        statusDetail: value.status_details,
      };
    }),
  });
}

export function shippoGet(carrier, trackingNumber) {
  return new Promise((resolve, reject) => {
    fetch(buildURI(carrier, trackingNumber)).then((response) => {
      response.json().then((json) => {
        if (!response.ok || !json || !json.tracking_status) {
          reject('Error retrieving info from Shippo');
        } else {
          resolve(transformResponse(json));
        }
      }).catch((err) => { reject('Error parsing json from Shippo'); });
    });
  });
}
