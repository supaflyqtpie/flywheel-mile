import React from 'react';

export default function PackageDetail({ carrier, trackingNumber, history }) {
  return (
    <div>{trackingNumber}</div>
  );
}

PackageDetail.propTypes = {
  carrier: React.PropTypes.string,
  trackingNumber: React.PropTypes.string,
  history: React.PropTypes.array,
};
