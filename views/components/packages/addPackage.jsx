import React from 'react';
import { connect } from 'react-redux';
import { requestToAddPackage } from '../../actions/packages';

const AddPackage = ({ dispatch, id, isAdding, addPackageError }) => {
  let inputTrackingNumber;
  let inputCarrier;

  return (
    <form
      id={id}
      className="form-inline"
      onSubmit={e => {
        e.preventDefault();
        if (!inputTrackingNumber.value.trim()) {
          return;
        }
        dispatch(requestToAddPackage(inputCarrier, inputTrackingNumber.value));
        inputTrackingNumber.value = '';
      }}
      disabled={isAdding}
    >
      <div className="form-group">
        <input
          className="form-control"
          placeholder="Tracking Number"
          type="text"
          ref={node => {
            inputTrackingNumber = node;
          }}
        />
      </div>
      <select
        className="form-control left"
        ref={node => {
          if (node) {
            inputCarrier = node.value;
          }
        }}
        onChange={event => {
          inputCarrier = event.target.value;
        }}
      >
        <option value="fedex">Fedex</option>
        <option value="ups">UPS</option>
        <option value="usps">USPS</option>
      </select>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={isAdding}
      >
        {isAdding
          ? <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
          : <i className="fa fa-plus" aria-hidden="true"></i>
        }
      </button>
      {addPackageError?
        <div className="panel panel-danger right">
          <div className="panel-heading">Sorry, your package was not found.</div>
        </div> : false
      }
    </form>
  );
};

AddPackage.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  id: React.PropTypes.string,
  isAdding: React.PropTypes.bool,
  addPackageError: React.PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    isAdding: state.packages.isAdding,
    addPackageError: state.packages.addPackageError,
  };
}

export default connect(mapStateToProps)(AddPackage);
