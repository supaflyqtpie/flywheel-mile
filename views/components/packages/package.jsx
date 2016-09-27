import React from 'react';
const moment = require('moment');

export default function Package({ carrier, trackingNumber, history, onDeleteClick, isProcessingDelete }) {
  return (
    <tbody>
      <tr data-toggle="collapse" data-target={'#'+trackingNumber}>
        <td>{carrier}</td>
        <td>{trackingNumber}</td>
        <td>
          <div onClick={onDeleteClick} disabled={isProcessingDelete}>
            {isProcessingDelete
              ? <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
              : <i className="fa fa-remove" aria-hidden="true"></i>
            }
          </div>
        </td>
      </tr>
      <tr id={trackingNumber} className="collapse">
        <td>
          <tr>Location:</tr>
          <tr>Status:</tr>
          <tr>Detail:</tr>
          <tr>Updated:</tr>
        </td>
        <td>
          <tr>{history[0].city + ', ' +history[0].state}</tr>
          <tr>{history[0].status}</tr>
          <tr>{history[0].statusDetail}</tr>
          <tr>{moment(history[0].statusDate).format('LLL')}</tr>
        </td>
      </tr>
    </tbody>
      // {/*<PackageDetail />*/}
      // <tr>
      //   <td id={trackingNumber} className="collapse">Hello</td>
      // </tr>
  );
}

Package.propTypes = {
  carrier: React.PropTypes.string,
  trackingNumber: React.PropTypes.string,
  history: React.PropTypes.array,
  onDeleteClick: React.PropTypes.func,
  isProcessingDelete: React.PropTypes.bool,
};
