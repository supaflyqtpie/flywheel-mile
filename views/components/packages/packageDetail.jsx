import React from 'react';

export default function PackageDetail({ carrier, trackingNumber, onDeleteClick, isProcessingDelete }) {
  return (
    <div id="test">Hello</div>
  );
}

PackageDetail.propTypes = {
  carrier: React.PropTypes.string,
  trackingNumber: React.PropTypes.string,
  onDeleteClick: React.PropTypes.func,
  isProcessingDelete: React.PropTypes.bool,
};
