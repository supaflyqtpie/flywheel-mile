import React from 'react';
import { connect } from 'react-redux';
import { requestToAddPackage } from '../../actions/packages';

const AddPackage = ({ dispatch, id, isAdding }) => {
  let inputTrackingNumber;

  return (
    <form
      id={id}
      className="form-inline"
      onSubmit={e => {
        e.preventDefault();
        if (!inputTrackingNumber.value.trim()) {
          return;
        }
        dispatch(requestToAddPackage(inputTrackingNumber.value));
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
    </form>
  );
};

AddPackage.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  id: React.PropTypes.string,
  isAdding: React.PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    isAdding: state.packages.isAdding,
  };
}

export default connect(mapStateToProps)(AddPackage);
