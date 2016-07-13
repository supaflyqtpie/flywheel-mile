import React from 'react';

export default function Package({ carrier, trackingNumber, onDeleteClick, isProcessingDelete }) {
  return (
    <tr>
      <td>{carrier}</td>
      <td>{trackingNumber}</td>
      <td>
        <button className="btn btn-danger" onClick={onDeleteClick} disabled={isProcessingDelete}>
          {isProcessingDelete
            ? <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
            : <i className="fa fa-remove" aria-hidden="true"></i>
          }
        </button>
      </td>
    </tr>
  );
}

Package.propTypes = {
  carrier: React.PropTypes.string,
  trackingNumber: React.PropTypes.string,
  onDeleteClick: React.PropTypes.func,
  isProcessingDelete: React.PropTypes.bool,
};
