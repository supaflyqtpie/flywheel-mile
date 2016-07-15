import React from 'react';
import { connect } from 'react-redux';
import Package from './package';
import { requestToDeletePackage } from '../../actions/packages';

function PackagesTable({ packages, onDeleteClick, getPackagesError }) {
  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>Carrier</th>
          <th>Your Packages</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {packages.map(item =>
          <Package
            key={item.id}
            onDeleteClick={() => onDeleteClick(item.id)}
            {...item}
          />
        )}
        {(getPackagesError.length > 0) ?
          <h3 className="text-center">{getPackagesError}</h3>
        : false}
      </tbody>
    </table>
  );
}

PackagesTable.propTypes = {
  packages: React.PropTypes.array,
  onDeleteClick: React.PropTypes.func,
  getPackagesError: React.PropTypes.string,
};

function mapStateToProps(state) {
  return {
    packages: state.packages.items,
    getPackagesError: state.packages.getPackagesError,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onDeleteClick: (id) => {
      dispatch(requestToDeletePackage(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PackagesTable);
