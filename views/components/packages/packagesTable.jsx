import React from 'react';
import { connect } from 'react-redux';
import Package from './package';
import { requestToDeletePackage } from '../../actions/packages';

function FeedsTable({ packages, onDeleteClick }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
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
      </tbody>
    </table>
  );
}

FeedsTable.propTypes = {
  packages: React.PropTypes.array,
  onDeleteClick: React.PropTypes.func,
};

function mapStateToProps(state) {
  return {
    packages: state.packages.items,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onDeleteClick: (id) => {
      dispatch(requestToDeletePackage(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedsTable);
