import React from 'react';
import { connect } from 'react-redux';

const PackageDetailInfo = ({ packageDetail }) => {
  return (
    <div>
      {packageDetail.trackingNumber}
    </div>
  );
};

PackageDetailInfo.propTypes = {
  packageDetail: React.PropTypes.array,
};

function mapStateToProps(state) {
  return {
    packageDetail: state.packages.packageDetail,
  };
}

export default connect(mapStateToProps)(PackageDetailInfo);
