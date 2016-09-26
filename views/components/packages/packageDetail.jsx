import React from 'react';

export default function PackageDetail({ carrier, trackingNumber, onDeleteClick, isProcessingDelete }) {
  return (
    <tr>
      <td>Status</td>
    </tr>
  );
}

PackageDetail.propTypes = {
  carrier: React.PropTypes.string,
  trackingNumber: React.PropTypes.string,
  onDeleteClick: React.PropTypes.func,
  isProcessingDelete: React.PropTypes.bool,
};
