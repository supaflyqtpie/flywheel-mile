const baseURI = 'https://api.goshippo.com/v1/tracks';

function buildURI(carrier, trackingNumber) {
  return `${baseURI}/${carrier}/${trackingNumber}/`;
}

export function shippoGet(carrier, trackingNumber) {
  return fetch(buildURI(carrier, trackingNumber));
}
