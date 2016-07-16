import React from 'react';

const PackageForm = ({ onSubmitForm, isProcessing, packageError }) => {
  let inputTrackingNumber;
  let inputCarrier;

  return (
    <form
      className="form-inline"
      onSubmit={e => {
        e.preventDefault();
        if (!inputTrackingNumber.value.trim()) {
          return;
        }
        onSubmitForm(inputCarrier, inputTrackingNumber.value);
        inputTrackingNumber.value = '';
      }}
      disabled={isProcessing}
    >
      <div className="form-group package-form-group">
        <input
          className="form-control"
          placeholder="Tracking Number"
          type="text"
          ref={node => {
            inputTrackingNumber = node;
          }}
        />
      </div>
      <div className="form-group package-form-group">
        <select
          className="form-control"
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
      </div>
      <button
        type="submit"
        id="package-form-btn"
        className="btn btn-primary"
        disabled={isProcessing}
      >
        {isProcessing
          ? <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
          : 'Track'
        }
      </button>
      {(packageError.length > 0) ?
        <div className="panel panel-danger right" style={{ color: '#1A237E' }}>
          <div className="panel-heading">{packageError}</div>
        </div> : false
      }
    </form>
  );
};

PackageForm.propTypes = {
  onSubmitForm: React.PropTypes.func.isRequired,
  isProcessing: React.PropTypes.bool.isRequired,
  packageError: React.PropTypes.string.isRequired,
};

export default PackageForm;
