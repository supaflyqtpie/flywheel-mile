import React from 'react';
import { connect } from 'react-redux';
import { formatDatePretty, formatAddress } from '../../../util/formatUtil';

const PackageDetailInfo = ({ packageDetail }) => {
  return (
    <div className="container-fluid detailHeader">
      <div className="panel panel-info">
        <div className="panel-heading">{packageDetail.trackingNumber}</div>
        <div className="panel-body">
          <div className="col-sm-6 detailBody">
            <div className="panel panel-info">
              <div className="panel-heading">History</div>
              <div className="panel-body">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Date Updated</th>
                      <th>Status</th>
                      <th>Location</th>
                      <th>Info</th>
                    </tr>
                  </thead>
                  {packageDetail.history.map(item =>
                    <tbody>
                      <tr>
                        <td>{formatDatePretty(item.statusDate)}</td>
                        <td>{item.status}</td>
                        <td>{formatAddress(item.location)}</td>
                        <td>{item.statusDetail}</td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
          <div className="col-sm-5 detailBody">
            <div className="panel panel-info">
              <div className="panel-heading text-info">Details</div>
              <div className="panel-body">
                <table>
                  <tbody>
                    <td>
                      <tr>Origin:</tr>
                      <tr>Destination:</tr>
                      <tr>ETA:</tr>
                      <tr>Carrier:</tr>
                      <tr>Service:</tr>
                    </td>
                    <td>
                      <tr>{formatAddress(packageDetail.origin)}</tr>
                      <tr>{formatAddress(packageDetail.destination)}</tr>
                      <tr>{formatDatePretty(packageDetail.eta)}</tr>
                      <tr>{packageDetail.carrier}</tr>
                      <tr>{packageDetail.serviceLevel.name}</tr>
                    </td>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PackageDetailInfo.propTypes = {
  packageDetail: React.PropTypes.object,
};

function mapStateToProps(state) {
  return {
    packageDetail: state.packages.packageDetail,
  };
}

export default connect(mapStateToProps)(PackageDetailInfo);
